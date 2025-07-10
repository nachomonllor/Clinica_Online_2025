// estadisticas.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Especialista } from '../models/especialista.model'; // ajusta la ruta
import { Visita } from '../models/visita.model';

@Injectable({ providedIn: 'root' })

export class EstadisticasService {

  // especialistasMock: Especialista[] = [
  //   { id: 1, nombre: 'Ana', apellido: 'Pérez', edad: 40, dni: '12345678', especialidad: 'Cardiología', mail: '', password: '', imagenPerfil: '' },
  //   { id: 2, nombre: 'Luis', apellido: 'Gómez', edad: 38, dni: '87654321', especialidad: 'Pediatría', mail: '', password: '', imagenPerfil: '' },
  //   { id: 3, nombre: 'María', apellido: 'López', edad: 45, dni: '11223344', especialidad: 'Cardiología', mail: '', password: '', imagenPerfil: '' },
  //   { id: 4, nombre: 'Carlos', apellido: 'Fernández', edad: 50, dni: '44332211', especialidad: 'Dermatología', mail: '', password: '', imagenPerfil: '' },
  //   { id: 5, nombre: 'Sofía', apellido: 'Suárez', edad: 35, dni: '55667788', especialidad: 'Pediatría', mail: '', password: '', imagenPerfil: '' },
  //   // … más especialistas
  // ];

  private especialistasMock: Record<string, Especialista> = {
    '1': {
      id: 1,
      nombre: 'Ana',
      apellido: 'Pérez',
      edad: 40,
      dni: '12345678',
      especialidad: 'Cardiología',
      mail: '',
      password: '',
      imagenPerfil: ''
    },
    '2': {
      id: 2,
      nombre: 'Luis',
      apellido: 'Gómez',
      edad: 38,
      dni: '87654321',
      especialidad: 'Pediatría',
      mail: '',
      password: '',
      imagenPerfil: ''
    },
    '3': {
      id: 3,
      nombre: 'María',
      apellido: 'López',
      edad: 45,
      dni: '11223344',
      especialidad: 'Cardiología',
      mail: '',
      password: '',
      imagenPerfil: ''
    },
    '4': {
      id: 4,
      nombre: 'Carlos',
      apellido: 'Fernández',
      edad: 50,
      dni: '44332211',
      especialidad: 'Dermatología',
      mail: '',
      password: '',
      imagenPerfil: ''
    },
    '5': {
      id: 5,
      nombre: 'Sofía',
      apellido: 'Suárez',
      edad: 35,
      dni: '55667788',
      especialidad: 'Pediatría',
      mail: '',
      password: '',
      imagenPerfil: ''
    }
    // … más claves si quieres
  };


  // Mock tipo diccionario: clave = id en Firebase, valor = Especialista
  // private especialistasMock: Record<string, Especialista> = {
  //   '1': { /* … */ },
  //   '2': { /* … */ },
  //   // …
  // };

  constructor() { }

  // getVisitasPorMes(): Observable<[string, number][]> {
  //   // → Reemplaza este mock por tu llamada real a la base de datos/API:
  //   const mock: [string, number][] = [
  //     ['Enero', 12],
  //     ['Febrero', 25],
  //     ['Marzo', 18],
  //     ['Abril', 30],
  //     ['Mayo', 22],
  //     ['Junio', 15],
  //   ];
  //   return of(mock);

  //   // Ejemplo si usaras un endpoint REST:
  //   // return this.http.get<[string, number][]>('/api/estadisticas/visitas-por-mes');
  // }

  // Mock de visitas durante el año
  private visitasMock: Visita[] = [
    { fecha: new Date(2025, 0, 5) }, // enero
    { fecha: new Date(2025, 0, 13) },
    { fecha: new Date(2025, 1, 21) }, // febrero
    { fecha: new Date(2025, 2, 10) }, // marzo
    { fecha: new Date(2025, 2, 18) },
    { fecha: new Date(2025, 3, 7) }, // abril
    { fecha: new Date(2025, 4, 12) }, // mayo
    { fecha: new Date(2025, 4, 20) },
    { fecha: new Date(2025, 5, 2) }, // junio
    { fecha: new Date(2025, 5, 15) },
    { fecha: new Date(2025, 5, 2) },
    { fecha: new Date(2025, 5, 15) },
    { fecha: new Date(2025, 5, 2) },
    { fecha: new Date(2025, 5, 15) },
    { fecha: new Date(2025, 5, 2) },
    { fecha: new Date(2025, 5, 15) },
    { fecha: new Date(2025, 5, 2) },
    { fecha: new Date(2025, 5, 15) },

    { fecha: new Date(2025, 7, 15) },
    { fecha: new Date(2025, 7, 2) },
    { fecha: new Date(2025, 7, 15) },
    { fecha: new Date(2025, 7, 2) },
    { fecha: new Date(2025, 7, 15) },
    // … agrega más visitas o cámbialo por tu fuente real
  ];

  getVisitasPorMes(): Observable<[string, number][]> {
    return of(this.visitasMock).pipe(
      map(visitas => {
        const meses = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const contador: Record<string, number> = {};

        // Recorremos cada visita con un for “común”
        for (let i = 0; i < visitas.length; i++) {
          const visita = visitas[i];
          const mesNombre = meses[visita.fecha.getMonth()];

          if (contador.hasOwnProperty(mesNombre)) {
            // Si ya existe la clave, incrementamos
            contador[mesNombre] = contador[mesNombre] + 1;
          } else {
            // Si no existe, la inicializamos en 1
            contador[mesNombre] = 1;
          }
        }

        // Construimos el array completo, incluyendo meses sin visitas (0)
        const resultado: [string, number][] = [];
        for (let j = 0; j < meses.length; j++) {
          const m = meses[j];
          resultado.push([m, contador[m] || 0]);
        }

        return resultado;
      })
    );
  }

  getPacientesPorEspecialidad(): Observable<[string, number][]> {
    // → MOCK: sustituir por llamada real al API si la tienes
    const visitasEspecialidades: [string, number][] = [
      ['Cardiología', 45],
      ['Pediatría', 32],
      ['Dermatología', 28],
      ['Traumatología', 18],
      ['Ginecología', 22]
    ];

    // Diccionario contador
    const contador: Record<string, number> = {};

    // Recorremos el mock con un for “común”
    for (let i = 0; i < visitasEspecialidades.length; i++) {
      // Desestructuramos nombre de especialidad y pacientes
      const especialidadNom = visitasEspecialidades[i][0];
      const cantidadPacientes = visitasEspecialidades[i][1];

      if (contador.hasOwnProperty(especialidadNom)) {
        // Si ya existe, sumamos la cantidad
        contador[especialidadNom] = contador[especialidadNom] + cantidadPacientes;
      } else {
        // Si no existe, inicializamos con la cantidad
        contador[especialidadNom] = cantidadPacientes;
      }
    }

    // Convertimos el Record en el array de tuplas
    const resultado: [string, number][] = [];
    for (const esp in contador) {
      if (contador.hasOwnProperty(esp)) {
        resultado.push([esp, contador[esp]]);
      }
    }

    // Devolvemos como Observable
    return of(resultado);
  }

  /** Simula fetch desde Firebase y convierte el Record en un array */
  getEspecialistas(): Observable<Especialista[]> {
    const lista: Especialista[] = [];
    for (const key in this.especialistasMock) {
      if (this.especialistasMock.hasOwnProperty(key)) {
        lista.push(this.especialistasMock[key]);
      }
    }
    return of(lista);
  }

  /** Cuenta especialistas por especialidad (igual que antes) */
  getEspecialistasPorEspecialidad(): Observable<[string, number][]> {
    return this.getEspecialistas().pipe(
      map(lista => {
        const contador: Record<string, number> = {};
        // Bucle “a lo C#”
        for (let i = 0; i < lista.length; i++) {
          const esp = lista[i].especialidad || 'Sin especialidad';
          if (contador.hasOwnProperty(esp)) {
            contador[esp] += 1;
          } else {
            contador[esp] = 1;
          }
        }
        // Pasar a array de tuplas
        const resultado: [string, number][] = [];
        for (const key in contador) {
          if (contador.hasOwnProperty(key)) {
            resultado.push([key, contador[key]]);
          }
        }
        return resultado;
      })
    );
  }

  

}




//  private medicosMock: Medico[] = [
//   { nombre: 'Dr. Pérez',    especialidad: 'Cardiología' },
//   { nombre: 'Dra. Gómez',    especialidad: 'Pediatría' },
//   { nombre: 'Dr. Fernández', especialidad: 'Cardiología' },
//   { nombre: 'Dra. Suárez',   especialidad: 'Dermatología' },
//   { nombre: 'Dr. López',     especialidad: 'Pediatría' },
//   // … más entries
// ];

// /** Devuelve la lista de médicos */
// getMedicos(): Observable<Medico[]> {
//   return of(this.medicosMock);
// }

// /** Cuenta cuántos médicos hay por especialidad */
// getMedicosPorEspecialidad(): Observable<[string, number][]> {
//   return this.getMedicos().pipe(
//     map(medicos => {
//       const contador: Record<string, number> = {};
//       medicos.forEach(m => {
//         contador[m.especialidad] = (contador[m.especialidad] || 0) + 1;
//       });
//       // Convertimos el Record en un array de tuplas para Google Charts:
//       return Object.entries(contador);
//     })
//   );
// }




// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EstadisticasService {

//   constructor() { }
// }

