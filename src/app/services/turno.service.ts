// src/app/services/turno.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service'; // tu servicio de autenticación
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { Turno } from '../models/turno.model';

import { of } from 'rxjs';
import { Paciente } from '../models/paciente.model';
import { TurnoEspecialista } from '../models/turno-especialista.model';
import { Especialista } from '../models/especialista.model';

interface TurnoDto {
  pacienteId: string;
  id: number;
  fecha: string;
  hora: string;
  especialidad: string;
  especialista: string;
  estado: string;
  resena?: string;
  encuesta?: boolean;
  calificacion?: number;
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

  // → aquí el mock único para toda la app
  private mockTurnos: Turno[] = [
    { id: 100, fecha: new Date('2025-06-25'), hora: '09:30', especialidad: 'Cardiología', especialista: 'Dra. Pérez', estado: 'aceptado', resena: 'Excelente atención, muy profesional.', encuesta: false, calificacion: 10, pacienteId: '3' },
    { id: 101, fecha: new Date('2025-06-28'), hora: '14:00', especialidad: 'Dermatología', especialista: 'Dr. Gómez', pacienteId: '4', estado: 'aceptado', resena: 'Me gustó mucho la consulta.', encuesta: true, calificacion: 10 },
    { id: 102, fecha: new Date('2025-06-28'), hora: '14:00', especialidad: 'Dermatología', especialista: 'Dr. Gómez', pacienteId: '4', estado: 'realizado', resena: 'Me gustó mucho la consulta.', encuesta: true, calificacion: 10 },
    { id: 103, fecha: new Date('2025-07-02'), hora: '11:15', especialidad: 'Pediatría', especialista: 'Dra. Ruiz', pacienteId: '4', estado: 'pendiente', resena: "prueba res", encuesta: false, calificacion: 8 },
    { id: 104, fecha: new Date('2025-07-02'), hora: '11:15', especialidad: 'Pediatría', especialista: 'Dra. Ruiz', pacienteId: '4', estado: 'pendiente', resena: "prueba res", encuesta: false, calificacion: 8 },
    { id: 105, fecha: new Date('2025-07-02'), hora: '15:20', especialidad: 'Pediatría', especialista: 'Dra. Ruiz', pacienteId: '4', estado: 'pendiente', resena: "prueba res", encuesta: false, calificacion: 8 },
    { id: 106, fecha: new Date('2025-07-02'), hora: '11:45', especialidad: 'Neurologia', especialista: 'Dra. Ruiz', pacienteId: '4', estado: 'realizado', resena: "prueba res", encuesta: false, calificacion: 8 },
    { id: 107, fecha: new Date('2025-07-02'), hora: '11:30', especialidad: 'Pediatría', especialista: 'Dra. Ruiz', pacienteId: '4', estado: 'realizado', resena: "prueba res", encuesta: false, calificacion: 8 },
    { id: 108, fecha: new Date('2025-09-02'), hora: '12:15', especialidad: 'Cardiologia', especialista: 'Dra. Nora Da Puente', pacienteId: '5', estado: 'realizado', resena: 'Reseña de prueba', encuesta: false, calificacion: 9 },
    { id: 109, fecha: new Date('2025-06-22'), hora: '13:15', especialidad: 'Diabetóloga', especialista: 'Dra. Florencia De Césare', estado: 'realizado', resena: 'Reseña de prueba', encuesta: false, pacienteId: '6', calificacion: 10 }

  ];

  // // → mock de pacientes que atiende este especialista
  private mockPacientes: Paciente[] = [
    { id: '3', avatarUrl: 'avatar1', nombre: 'Ramon', apellido: 'Ruiz', edad: 40, dni: '7777888999', obraSocial: 'IOMA', email: 'ramon@ruiz.com', password: '123456', imagenPerfil1: 'assets/avatar.JPG', imagenPerfil2: 'assets/avatar.JPG' },
    { id: '4', avatarUrl: 'avatarx', nombre: 'Fernando', apellido: 'Marquez', edad: 40, dni: '6666777755', obraSocial: 'OSDE', email: 'juan@ruiz.com', password: '123456', imagenPerfil1: 'assets/avatar.JPG', imagenPerfil2: 'assets/avatar.JPG' },
    { id: '5', avatarUrl: 'avatarx', nombre: 'Francisco', apellido: 'Torres', edad: 40, dni: '6666777755', obraSocial: 'OSDE', email: 'juan@ruiz.com', password: '123456', imagenPerfil1: 'assets/avatar.JPG', imagenPerfil2: 'assets/avatar.JPG' },
    { id: '6', avatarUrl: 'avatarx', nombre: 'Edgardo', apellido: 'Amicucci', edad: 40, dni: '6666777755', obraSocial: 'OSDE', email: 'juan@ruiz.com', password: '123456', imagenPerfil1: 'assets/avatar.JPG', imagenPerfil2: 'assets/avatar.JPG' }
    // agrega los demás según tu mock de turnos…
  ];

  // Mock de especialistas
  private especialistasMock: Especialista[] = [
    { id: 1, nombre: 'Ana', apellido: 'Pérez', edad: 40, dni: '12345678', especialidad: 'Cardiología', mail: '', password: '', imagenPerfil: '' },
    { id: 2, nombre: 'Luis', apellido: 'Gómez', edad: 38, dni: '87654321', especialidad: 'Pediatría', mail: '', password: '', imagenPerfil: '' },
    { id: 3, nombre: 'María', apellido: 'López', edad: 45, dni: '11223344', especialidad: 'Cardiología', mail: '', password: '', imagenPerfil: '' },
    { id: 4, nombre: 'Carlos', apellido: 'Fernández', edad: 50, dni: '44332211', especialidad: 'Dermatología', mail: '', password: '', imagenPerfil: '' },
    { id: 5, nombre: 'Sofía', apellido: 'Suárez', edad: 35, dni: '55667788', especialidad: 'Pediatría', mail: '', password: '', imagenPerfil: '' },
    // … más especialistas
  ];

  /** Devuelve todos los pacientes mock */
  getMockPacientes(): Observable<Paciente[]> {
    return of(this.mockPacientes);
  }


  /**
   * Devuelve los turnos enriquecidos con el nombre completo del paciente
   * Sólo para MisTurnosEspecialistaComponent
   */
  getMockTurnosConPaciente(): Observable<(Turno & { pacienteNombre: string })[]> {
    return forkJoin({
      turnos: this.getMockTurnos(),
      pacientes: this.getMockPacientes()
    }).pipe(
      map(({ turnos, pacientes }) =>
        turnos.map(t => {
          const p = pacientes.find(x => x.id === t.pacienteId);
          return {
            ...t,
            pacienteNombre: p ? `${p.nombre} ${p.apellido}` : '—'
          };
        })
      )
    );
  }

  /** Devuelve todos los turnos (mock) */
  getMockTurnos(): Observable<Turno[]> {
    return of(this.mockTurnos);
  }

  /** Devuelve sólo el turno con el id indicado */
  getMockTurnoById(id: number): Observable<Turno | undefined> {
    return of(this.mockTurnos.find(t => t.id === id));
  }

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
  // getTurnosPorMedico(
  //   medicoId: string,
  //   from: Date,
  //   to: Date,
  //   estado: 'solicitado' | 'finalizado'
  // ): Observable<Turno[]> {
  //   return this.afs
  //     .collection<Turno>(this.coleccion, ref =>
  //       ref
  //         .where('medicoId', '==', medicoId)
  //         .where('fecha', '>=', from.toISOString())
  //         .where('fecha', '<=', to.toISOString())
  //         .where('estado', '==', estado)
  //     )
  //     .valueChanges({ idField: 'id' });
  // }

  /** Solo DTOs: lee crudo desde Firebase */
  getTurnosPacienteDto(pacienteId: string): Observable<TurnoDto[]> {
    return this.afs
      .collection<TurnoDto>(this.coleccion, ref =>
        ref.where('pacienteId', '==', pacienteId)
      )
      .valueChanges();
  }

  // turno.service.ts
  setResenaEspecialista(id: number, texto: string): Observable<void> {
    const turno = this.mockTurnos.find(t => t.id === id);
    if (turno) {
      turno.resenaEspecialista = texto;
    }
    return of(void 0);
  }

  getMockTurnosEspecialista(): Observable<TurnoEspecialista[]> {
    return forkJoin({
      turnos: of(this.mockTurnos),
      pacientes: of(this.mockPacientes)
    }).pipe(
      map(({ turnos, pacientes }) =>
        turnos.map(t => {
          // formateo manual dd/MM/yyyy
          const d = t.fecha instanceof Date ? t.fecha : new Date(t.fecha);
          const fechaStr = [
            d.getDate().toString().padStart(2, '0'),
            (d.getMonth() + 1).toString().padStart(2, '0'),
            d.getFullYear()
          ].join('/');

          const p = pacientes.find(x => x.id === t.pacienteId);
          const pacienteStr = p
            ? `${p.nombre} ${p.apellido} (ID:${p.id})`
            : 'Paciente no asignado';

          return {
            id: t.id,
            fecha: fechaStr,        // <-- ahora un string dd/MM/yyyy
            hora: t.hora,
            especialidad: t.especialidad,
            paciente: pacienteStr,
            estado: t.estado,
            resena: t.resenaEspecialista
          } as TurnoEspecialista;
        })
      )
    );
  }

  /** Devuelve todos los especialistas */
  getEspecialistas(): Observable<Especialista[]> {
    // Reemplaza `of` por tu llamada real a la API si la tienes
    return of(this.especialistasMock);
  }

  /** Cuenta cuántos especialistas hay por especialidad */
  getEspecialistasPorEspecialidad(): Observable<[string, number][]> {
    return this.getEspecialistas().pipe(
      map(lista => {
        const contador: Record<string, number> = {};
        lista.forEach(e => {
          const esp = e.especialidad || 'Sin especialidad';
          contador[esp] = (contador[esp] || 0) + 1;
        });
        // Convertimos a array de tuplas
        return Object.entries(contador);
      })
    );
  }

  /** Devuelve todos los pacientes (para el select) */
  getPacientes(): Observable<Paciente[]> {
    return of(this.mockPacientes);
  }

  // /** Devuelve todos los turnos (para conteos globales) */
  // getAllTurnos(): Observable<Turno[]> {
  //   return of(this.mockTurnos);
  // }

  /** Filtra los turnos por pacienteId */
  getTurnosPorPaciente(pacienteId: string): Observable<Turno[]> {
    const resultado: Turno[] = [];
    for (let i = 0; i < this.mockTurnos.length; i++) {
      if (this.mockTurnos[i].pacienteId === pacienteId) {
        resultado.push(this.mockTurnos[i]);
      }
    }
    return of(resultado);
  }

  /** Cuenta cuántas visitas hay por especialidad en todos los turnos */
  getVisitasPorEspecialidad(): Observable<[string, number][]> {
    const contador: Record<string, number> = {};
    for (let i = 0; i < this.mockTurnos.length; i++) {
      const esp = this.mockTurnos[i].especialidad;
      if (contador.hasOwnProperty(esp)) {
        contador[esp]++;
      } else {
        contador[esp] = 1;
      }
    }
    const arr: [string, number][] = [];
    for (const esp in contador) {
      if (contador.hasOwnProperty(esp)) {
        arr.push([esp, contador[esp]]);
      }
    }
    return of(arr);
  }


}
