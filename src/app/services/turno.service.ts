// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TurnoService {

//   constructor() { }
// }

// src/app/services/turno.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service'; // tu servicio de autenticación
import { Observable } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { Turno } from '../models/turno.model';

interface TurnoDto {
  pacienteId: any; id: number; fecha: string; hora: string;
  especialidad: string; especialista: string; estado: string;
  resena?: string; encuesta?: boolean; calificacion?: number;
}
/**
 * Estructura para devolver conteos agrupados
 */
export interface CountByKey {
  key: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class TurnoService {
  private coleccion = 'turnos';

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) { }

  getTurnosPaciente(): Observable<Turno[]> {
    return this.auth.user$.pipe(
      filter(u => !!u),  // sólo usuarios no null
      switchMap(u =>
        this.afs
          .collection<Turno>(this.coleccion, ref =>
            ref.where('pacienteId', '==', u!.uid)
          )
          .valueChanges({ idField: 'id' })
      )
    );
  }

  // getTurnosPacienteDto(): Observable<Turno[]> {
  //   return this.http.get<TurnoDto[]>('/api/turnos/paciente').pipe(
  //     map(arr => arr.map(dto => ({
  //       ...dto,
  //       fecha: new Date(dto.fecha)
  //     })))
  //   );
  // }

  /** Actualiza campos de un turno */
  actualizarTurno(id: string, data: Partial<Turno>) {
    return this.afs.doc(`${this.coleccion}/${id}`).update(data);
  }

  /** Todos los turnos */
  getAllTurnos(): Observable<Turno[]> {
    return this.afs
      .collection<Turno>(this.coleccion)
      .valueChanges({ idField: 'id' });
  }

  /** Cantidad de turnos por especialidad */
  getTurnosByEspecialidad(): Observable<CountByKey[]> {
    return this.getAllTurnos().pipe(
      map(turnos => {
        const mapCount = new Map<string, number>();
        turnos.forEach(t => {
          const esp = t.especialidad || 'Sin especialidad';
          mapCount.set(esp, (mapCount.get(esp) ?? 0) + 1);
        });
        return Array.from(mapCount.entries()).map(([key, count]) => ({ key, count }));
      })
    );
  }

  /** Cantidad de turnos por día (YYYY-MM-DD) */
  getTurnosByDia(): Observable<CountByKey[]> {
    return this.getAllTurnos().pipe(
      map((turnos: any[]) => {
        const mapCount = new Map<string, number>();
        turnos.forEach(t => {
          const fechaISO = new Date(t.fecha).toISOString().split('T')[0];
          mapCount.set(fechaISO, (mapCount.get(fechaISO) ?? 0) + 1);
        });
        return Array.from(mapCount.entries()).map(([key, count]) => ({ key, count }));
      })
    );
  }

  /**
   * Turnos de un médico en un rango de fechas, filtrados por estado (solicitado | finalizado)
   */
  getTurnosPorMedico(
    medicoId: string,
    from: Date,
    to: Date,
    estado: 'solicitado' | 'finalizado'
  ): Observable<Turno[]> {
    return this.afs
      .collection<Turno>(this.coleccion, ref =>
        ref
          .where('medicoId', '==', medicoId)
          .where('fecha', '>=', from.toISOString())
          .where('fecha', '<=', to.toISOString())
          .where('estado', '==', estado)
      )
      .valueChanges({ idField: 'id' });
  }

  /** Solo DTOs: lee crudo desde Firebase */
  getTurnosPacienteDto(pacienteId: string): Observable<TurnoDto[]> {
    return this.afs
      .collection<TurnoDto>(this.coleccion, ref =>
        ref.where('pacienteId', '==', pacienteId)
      )
      .valueChanges();
  }

  // getTurnosPacienteDesdeDto(pacienteId: string): Observable<Turno[]> {
  //   return this.getTurnosPacienteDto(pacienteId).pipe(
  //     map(dtos =>
  //       dtos.map(dto => ({
  //         pacienteId: dto.pacienteId,       
  //         id: dto.id,
  //         fecha: new Date(dto.fecha),
  //         hora: dto.hora,
  //         especialidad: dto.especialidad,
  //         especialista: dto.especialista,
  //         estado: dto.estado,
  //         resena: dto.resena,
  //         encuesta: dto.encuesta,
  //         calificacion: dto.calificacion
  //       }))
  //     )
  //   );
  // }

}
