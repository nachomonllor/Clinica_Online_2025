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
import { Turno } from './models/turno.model';
import { map, switchMap, filter } from 'rxjs/operators';

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

}
