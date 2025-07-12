// src/app/services/turno.service.ts
import { Injectable } from '@angular/core';
import { Turno, TurnoEstado } from '../models/turno.model';
import { Observable, of } from 'rxjs';
import { Paciente } from '../models/paciente.model';
import { Especialista } from '../models/especialista.model';

/**
 * Estructura para devolver conteos agrupados
 */
export interface CountByKey {
  key: string;
  count: number;
}

// turnos.service.ts
@Injectable({ providedIn: 'root' })
export class TurnoService {

  mockPacientes: Paciente[] = [
    {
      idPaciente: '3',
      avatarUrl: 'assets/avatars/ramon.png',
      nombre: 'Ramón',
      apellido: 'Ruiz',
      edad: 40,
      dni: '7777888999',
      obraSocial: 'IOMA',
      email: 'ramon@ruiz.com',
      password: 'pass123',
      imagenPerfil1: 'assets/avatars/ramon1.png',
      imagenPerfil2: 'assets/avatars/ramon2.png',
      id: '1'
    },
    {
      idPaciente: '4',
      avatarUrl: 'assets/avatars/fernando.png',
      nombre: 'Fernando',
      apellido: 'Márquez',
      edad: 37,
      dni: '6666777755',
      obraSocial: 'OSDE',
      email: 'fernando@marquez.com',
      password: 'pass456',
      imagenPerfil1: 'assets/avatars/fernando1.png',
      imagenPerfil2: 'assets/avatars/fernando2.png',
      id: '2'
    }
  ];

  /** Mock de Especialistas */
  mockEspecialistas: Especialista[] = [
    {
      idEspecialista: 'e1',
      nombre: 'Ana',
      apellido: 'Pérez',
      edad: 45,
      dni: '11223344',
      especialidadNombre: 'Cardiología',
      mail: 'ana.perez@clinica.com',
      password: 'cardio123',
      imagenPerfil: 'assets/especialistas/ana.png'
    },
    {
      idEspecialista: 'e2',
      nombre: 'Luis',
      apellido: 'Gómez',
      edad: 50,
      dni: '22334455',
      especialidadNombre: 'Dermatología',
      mail: 'luis.gomez@clinica.com',
      password: 'derma456',
      imagenPerfil: 'assets/especialistas/luis.png'
    }
  ];

  /** Mock de Turnos */
  mockTurnos: Turno[] = [
    {
      idTurno: '100',
      fecha: '2025-06-25',      //  new Date('2025-06-25'),
      hora: '09:30',
      especialidadNombre: 'Cardiología',
      especialistaNombreApell: 'Dra. Ana Pérez',
      especialistaId: 'e1',
      pacienteId: '3',
      estado: 'aceptado' as TurnoEstado,
      resenaEspecialista: 'Paciente estable, sin complicaciones.',
      resenaPaciente: 'Excelente atención, muy profesional.',
      comentarioPaciente: 'Muy recomendable',
      calificacionDelPaciente: 10,
      encuesta: 'si'
    },
    {
      idTurno: '101',
      fecha: '2025-06-28',            // new Date('2025-06-28'),
      hora: '14:00',
      especialidadNombre: 'Dermatología',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e2',
      pacienteId: '4',
      estado: 'realizado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'La consulta fue muy efectiva.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 9,
      encuesta: 'no'
    }
  ];

  // src/app/services/turno.service.ts
  getMapaEspecialidades(): Record<string, string> {
    const mapaEsp: Record<string, string> = {};

    this.mockEspecialistas.forEach(e => {
      // solo si ambos valores están definidos
      if (e.idEspecialista && e.especialidadNombre) {
        mapaEsp[e.idEspecialista] = e.especialidadNombre;
      }
    });

    return mapaEsp;
  }

  /**
   * Cuenta visitas por especialidad (cruzando turno → especialista → especialidad)
   */
  getVisitasPorEspecialidad(): Observable<[string, number][]> {
    // 1) Armo un mapa especialistasId → especialidad
    const mapaEsp: Record<string, string> = {};
    for (let i = 0; i < this.mockEspecialistas.length; i++) {
      const e = this.mockEspecialistas[i];
      if (e.idEspecialista && e.especialidadNombre) {
        mapaEsp[e.idEspecialista] = e.especialidadNombre;
      }
    }

    // 2) Cuento con diccionario “C# style”
    const contador: Record<string, number> = {};
    for (let j = 0; j < this.mockTurnos.length; j++) {
      const t = this.mockTurnos[j];
      const esp = mapaEsp[t.especialistaId] || 'Sin especialidad';
      if (contador.hasOwnProperty(esp)) {
        contador[esp]++;
      } else {
        contador[esp] = 1;
      }
    }

    // 3) Lo paso a tuplas para Google Charts
    const result: [string, number][] = [];
    for (const key in contador) {
      if (contador.hasOwnProperty(key)) {
        result.push([key, contador[key]]);
      }
    }
    return of(result);
  }

  /** Devuelve la lista simulada de pacientes */
  getPacientes(): Observable<Paciente[]> {
    return of(this.mockPacientes);
  }

  /** Devuelve lista simulada de especialistas */
  getMockEspecialistas(): Observable<Especialista[]> {
    return of(this.mockEspecialistas);
  }

  /** Devuelve lista simulada de turnos de un especialista */
  getMockTurnosEspecialista(idEspecialista: string): Observable<Turno[]> {
    return of(this.mockTurnos.filter(t => t.especialistaId === idEspecialista));
  }

  /** Devuelve un turno por su id */
  getMockTurnoById(id: string): Observable<Turno | undefined> {
    return of(this.mockTurnos.find(t => t.idTurno === id));
  }

  /** Actualiza un turno (por ejemplo calificación o estado) */
  actualizarTurno(id: string, data: Partial<Turno>): Observable<Turno | undefined> {
    const t = this.mockTurnos.find(t => t.idTurno === id);
    if (t) Object.assign(t, data);
    return of(t);
  }

  /** Turnos por paciente */
  getTurnosPorPaciente(pacienteId: string): Observable<Turno[]> {
    return of(this.mockTurnos.filter(t => t.pacienteId === pacienteId));
  }


  /** Guarda la reseña que escribe el especialista */
  setResenaEspecialista(id: string, comentario: string): Observable<void> {
    const t = this.mockTurnos.find(t => t.idTurno === id);
    if (t) {
      t.resenaEspecialista = comentario;
    }
    return of(void 0);
  }

  // /** Obtiene un turno por ID */
  // getMockTurnoById(id: string): Observable<Turno | undefined> {
  //   return of(this.mockTurnos.find(t => t.idTurno === id));
  // }

}

