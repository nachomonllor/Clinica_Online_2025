
// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Especialista } from '../models/especialista.model';
import { Paciente } from '../models/paciente.model';
import { Turno, TurnoEstado } from '../models/turno.model';
import { UsuarioRow } from '../models/usuario-row.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private usuarios: Usuario[] = [];
  private usuarios$ = new BehaviorSubject<Usuario[]>([]);

 //  private usuarios$ = new BehaviorSubject<AnyUser[]>([]);

  mockPacientes: Paciente[] = [
    {
      idPaciente: '3',
      avatarUrl: 'assets/avatars/gerardo.JPG',
      nombre: 'Ramón',
      apellido: 'Ruiz',
      edad: 40,
      dni: '7777888999',
      obraSocial: 'IOMA',
      email: 'ramon@ruiz.com',
      password: 'pass123',
      imagenPerfil1: 'assets/avatars/gerardo.JPG',
      imagenPerfil2: 'assets/avatars/gerardo.JPG',
      id: '1'
    },
    {
      idPaciente: '4',
      avatarUrl: 'assets/avatars/leonardo.JPG',
      nombre: 'Leonardo',
      apellido: 'Márquez',
      edad: 37,
      dni: '6666777755',
      obraSocial: 'OSDE',
      email: 'fernando@marquez.com',
      password: 'pass456',
      imagenPerfil1: 'assets/avatars/leonardo.JPG',
      imagenPerfil2: 'assets/avatars/leonardo.JPG',
      id: '2'
    },
    {
      idPaciente: '5',
      avatarUrl: 'assets/avatars/angel.jpg',
      nombre: 'Angel',
      apellido: 'Hernandez',
      edad: 37,
      dni: '6666777755',
      obraSocial: 'OSDE',
      email: 'angel@gmail.com',
      password: 'pass456',
      imagenPerfil1: 'assets/avatars/angel.JPG',
      imagenPerfil2: 'assets/avatars/angel.jpg',
      id: '3'
    },
    {
      idPaciente: '6',
      avatarUrl: 'assets/avatars/laura.JPG',
      nombre: 'Laura',
      apellido: 'Gimenez',
      edad: 37,
      dni: '6666777755',
      obraSocial: 'OSDE',
      email: 'laura_gimenez@gmail.com',
      password: 'pass456',
      imagenPerfil1: 'assets/avatars/laura.JPG',
      imagenPerfil2: 'assets/avatars/laura.JPG',
      id: '4'
    },
    {
      idPaciente: '7',
      avatarUrl: 'assets/avatars/juliana.JPG',
      nombre: 'Juliana',
      apellido: 'Juarez',
      edad: 37,
      dni: '6666777755',
      obraSocial: 'OSDE',
      email: 'juarez@gmail.com',
      password: 'pass456',
      imagenPerfil1: 'assets/avatars/juliana.JPG',
      imagenPerfil2: 'assets/avatars/juliana.JPG',
      id: '5'
    },
    {
      idPaciente: '8',
      avatarUrl: 'assets/avatars/marcela.JPG',
      nombre: 'Marcela',
      apellido: 'Mendez',
      edad: 37,
      dni: '6666777755',
      obraSocial: 'OSDE',
      email: 'mendez@gmail.com',
      password: 'pass456',
      imagenPerfil1: 'assets/avatars/marcela.JPG',
      imagenPerfil2: 'assets/avatars/marcela.JPG',
      id: '6'
    },


  ];

  /** Mock de Especialistas */
  mockEspecialistas: Especialista[] = [
    {
      idEspecialista: 'e1',
      nombre: 'Ana',
      apellido: 'Pérez',
      edad: 45,
      dni: '11223344',
      especialidadNombre: 'cardiology',
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
      especialidadNombre: 'dermatology',
      mail: 'luis.gomez@clinica.com',
      password: 'derma456',
      imagenPerfil: 'assets/especialistas/luis.png'
    }
  ];

  /** Mock de Turnos */
  mockTurnos: Turno[] = [
    {
      idTurno: '100',
      fecha: '2025-06-25',
      hora: '09:30',
      especialidadNombre: 'cardiology',
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
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'dermatology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e2',
      pacienteId: '4',
      estado: 'aceptado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'La consulta fue muy efectiva.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 9,
      encuesta: 'no'
    },
    {
      idTurno: '102',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'dermatology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e3',
      pacienteId: '4',
      estado: 'rechazado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'La consulta fue muy efectiva.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 9,
      encuesta: 'no'
    },
    {
      idTurno: '103',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'dermatology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e4',
      pacienteId: '4',
      estado: 'aceptado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'buena atencion.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 9,
      encuesta: 'no'
    },
    {
      idTurno: '104',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'dermatology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e5',
      pacienteId: '4',
      estado: 'realizado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 9,
      encuesta: 'no'
    },

    {
      idTurno: '105',
      fecha: '2025-06-25',
      hora: '09:30',
      especialidadNombre: 'cardiology',
      especialistaNombreApell: 'Dra. Ana Pérez',
      especialistaId: 'e6',
      pacienteId: '3',
      estado: 'aceptado' as TurnoEstado,
      resenaEspecialista: 'Paciente estable, sin complicaciones.',
      resenaPaciente: 'Excelente atención, muy profesional.',
      comentarioPaciente: 'Muy recomendable',
      calificacionDelPaciente: 10,
      encuesta: 'si'
    },
    {
      idTurno: '106',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'dermatology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e7',
      pacienteId: '3',
      estado: 'aceptado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'La consulta fue muy efectiva.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 9,
      encuesta: 'no'
    },
    {
      idTurno: '107',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'dermatology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e8',
      pacienteId: '3',
      estado: 'rechazado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'La consulta fue muy efectiva.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 9,
      encuesta: 'no'
    },
    {
      idTurno: '108',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'dermatology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e9',
      pacienteId: '3',
      estado: 'aceptado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'buena atencion.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 9,
      encuesta: 'no'
    },
    {
      idTurno: '109',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'dermatology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e10',
      pacienteId: '3',
      estado: 'realizado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 9,
      encuesta: 'no'
    },
    {
      idTurno: '110',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'dermatology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e3',
      pacienteId: '5',
      estado: 'aceptado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 9,
      encuesta: 'no'
    },

    {
      idTurno: '111',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'dermatology',
      especialistaNombreApell: 'Dr. Luis Hernandez',
      especialistaId: 'e4',
      pacienteId: '7',
      estado: 'aceptado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido con interrupciones.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 9,
      encuesta: 'no'
    },
    {
      idTurno: '112',
      fecha: '2025-06-28',
      hora: '15:00',
      especialidadNombre: 'dermatology',
      especialistaNombreApell: 'Dr. Luis Hernandez',
      especialistaId: 'e4',
      pacienteId: '8',
      estado: 'aceptado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido con interrupciones.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 10,
      encuesta: 'no'
    },
    {
      idTurno: '113',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'dermatology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e4',
      pacienteId: '6',
      estado: 'rechazado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 9,
      encuesta: 'no'
    },

    //--------------------- laura gimenez ----------------------

    {
      idTurno: '114',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'cardiology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e4',
      pacienteId: '6',
      estado: 'aceptado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 10,
      encuesta: 'no'
    },
    {
      idTurno: '115',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'cardiology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e4',
      pacienteId: '6',
      estado: 'rechazado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 10,
      encuesta: 'no'
    },
    {
      idTurno: '116',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'cardiology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e4',
      pacienteId: '6',
      estado: 'rechazado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 10,
      encuesta: 'no'
    },
    {
      idTurno: '117',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'cardiology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e4',
      pacienteId: '6',
      estado: 'rechazado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 10,
      encuesta: 'no'
    },

    // ----------------- marcela mendez ---------------------

    {
      idTurno: '118',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'cardiology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e4',
      pacienteId: '8',
      estado: 'rechazado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 10,
      encuesta: 'no'
    },
    {
      idTurno: '119',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'cardiology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e4',
      pacienteId: '8',
      estado: 'aceptado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 10,
      encuesta: 'no'
    },
    {
      idTurno: '120',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'cardiology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e4',
      pacienteId: '8',
      estado: 'cancelado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 10,
      encuesta: 'no'
    },
    {
      idTurno: '121',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'cardiology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e4',
      pacienteId: '8',
      estado: 'cancelado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 10,
      encuesta: 'no'
    },
    {
      idTurno: '122',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'cardiology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e4',
      pacienteId: '8',
      estado: 'cancelado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 10,
      encuesta: 'no'
    },
    {
      idTurno: '123',
      fecha: '2025-06-28',
      hora: '14:00',
      especialidadNombre: 'cardiology',
      especialistaNombreApell: 'Dr. Luis Gómez',
      especialistaId: 'e4',
      pacienteId: '8',
      estado: 'cancelado' as TurnoEstado,
      resenaEspecialista: 'Tratamiento seguido correctamente.',
      resenaPaciente: 'excelente doc.',
      comentarioPaciente: 'Volvería sin dudar',
      calificacionDelPaciente: 10,
      encuesta: 'no'
    },

  ];

  // mockAdministradores: Administrador[] = [
  //   {
  //     id: '1',
  //     nombre: 'Admin',
  //     apellido: 'Principal',
  //     email: 'admin@clinica.com'
  //   }
  // ];



  mockAdministradores = [
    { id: '1', nombre: 'Admin', apellido: 'Principal', email: 'admin@clinica.com', imagenPerfil: '' }
  ];

  getUsuarios(): Observable<UsuarioRow[]> {
    const pacientes: UsuarioRow[] = this.mockPacientes.map(p => ({
      id:           p.idPaciente,
      perfil:       'Paciente',
      nombre:       p.nombre,
      apellido:     p.apellido,
      email:        p.email,
      imagenPerfil: p.imagenPerfil1
    }));

    const especialistas: UsuarioRow[] = this.mockEspecialistas.map(e => ({
      id:           e.idEspecialista,
      perfil:       'Especialista',
      nombre:       e.nombre,
      apellido:     e.apellido,
      email:        e.mail,
      activo:       true,
      imagenPerfil: e.imagenPerfil
    }));

    const administradores: UsuarioRow[] = this.mockAdministradores.map(a => ({
      id:           a.id,
      perfil:       'Administrador',
      nombre:       a.nombre,
      apellido:     a.apellido,
      email:        a.email,
      imagenPerfil: a.imagenPerfil
    }));

    return of([...pacientes, ...especialistas, ...administradores]);
  }
  



  constructor(private afs: AngularFirestore) { }

  /** 
   * Lee una colección de Firestore, añade el campo 'perfil' y el 'id' del doc 
   */
  // private fetch<T>(path: string, perfil: string): Observable<AnyUser[]> {
  //   return this.afs
  //     .collection<T>(path)
  //     .snapshotChanges()                             // para obtener id + datos
  //     .pipe(
  //       map(actions =>
  //         actions.map(a => {
  //           const data = a.payload.doc.data() as T;
  //           const id = a.payload.doc.id;
  //           // inyectamos el perfil y el id
  //           return { id, perfil, ...data } as AnyUser;
  //         })
  //       )
  //     );
  // }


  // /** Emite el listado completo de usuarios */
  //  getUsuarios(): Observable<Usuario[]> {
  //    return this.usuarios$.asObservable();
  //  }


  // usuario.service.ts (mock version)
  // getUsuarios(): Observable<AnyUser[]> {
  //   const pacientes = this.mockPacientes.map(p => ({
  //     id: p.idPaciente,
  //     perfil: 'Paciente' as const,
  //     nombre: p.nombre,
  //     apellido: p.apellido,
  //     email: p.email,      // ya existe
  //     imagenPerfil: p.imagenPerfil1
  //   }));

  //   const especialistas = this.mockEspecialistas.map(e => ({
  //     id: e.idEspecialista,
  //     perfil: 'Especialista' as const,
  //     nombre: e.nombre,
  //     apellido: e.apellido,
  //     email: e.mail,       // mapeo mail → email
  //     imagenPerfil: e.imagenPerfil,
  //     activo: true
  //   }));

  //   const administradores = this.mockAdministradores.map(a => ({
  //     id: a.id,
  //     perfil: 'Administrador' as const,
  //     nombre: a.nombre,
  //     apellido: a.apellido,
  //     email: a.email
  //   }));

  //   return of([...pacientes, ...especialistas, ...administradores]);
  // }


  /** Crea un usuario y emite la nueva lista */
  crearUsuario(u: Usuario): Observable<Usuario> {
    const nuevo: Usuario = { ...u, id: (this.usuarios.length + 1).toString() };
    this.usuarios.push(nuevo);
    this.usuarios$.next([...this.usuarios]);
    return of(nuevo);
  }

  /** Invierte el flag activo en un especialista */
  toggleActivo(id: string): Observable<Usuario | undefined> {
    const u = this.usuarios.find(x => x.id === id);
    if (u && u.perfil === 'Especialista') {
      u.activo = !u.activo;
      this.usuarios$.next([...this.usuarios]);
    }
    return of(u);
  }
}




// // usuario.service.ts
// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { Observable, combineLatest } from 'rxjs';
// import { map } from 'rxjs/operators';

// import { Paciente }      from '../models/paciente.model';
// import { Especialista }  from '../models/especialista.model';
// import { Administrador } from '../models/administrador.model';

// // 3) Crea la unión
// type AnyUser = Paciente | Especialista | Administrador;

// @Injectable({ providedIn: 'root' })
// export class UsuarioService {
//   constructor(private afs: AngularFirestore) {}

//   private fetch<T>(path: string, perfil: string): Observable<AnyUser[]> {
//     return this.afs.collection<T>(path).valueChanges({ idField: 'id' })
//       .pipe(
//         map(list =>
//           // inyectamos el campo perfil para poder diferenciar
//           (list as any[]).map(u => ({ ...u, perfil }))
//         )
//       );
//   }

/** Trae y concatena pacientes, especialistas y administradores */
// getUsuarios(): Observable<AnyUser[]> {
//   const pac$ = this.fetch<Paciente>('pacientes',      'Paciente');
//   const esp$ = this.fetch<Especialista>('especialistas','Especialista');
//   const adm$ = this.fetch<Administrador>('administradores','Administrador');

//   return combineLatest([pac$, esp$, adm$])
//     .pipe(map(([p, e, a]) => [...p, ...e, ...a]));
// }
// }
