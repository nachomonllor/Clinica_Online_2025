// estadisticas.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Especialista } from '../models/especialista.model'; // ajusta la ruta
import { Visita } from '../models/visita.model';

@Injectable({ providedIn: 'root' })

export class EstadisticasService {

  especialistasMock: Especialista[] = [
    { id: 1, nombre: 'Ana', apellido: 'Pérez', edad: 40, dni: '12345678', especialidad: 'Cardiología', mail: '', password: '', imagenPerfil: '' },
    { id: 2, nombre: 'Luis', apellido: 'Gómez', edad: 38, dni: '87654321', especialidad: 'Pediatría', mail: '', password: '', imagenPerfil: '' },
    { id: 3, nombre: 'María', apellido: 'López', edad: 45, dni: '11223344', especialidad: 'Cardiología', mail: '', password: '', imagenPerfil: '' },
    { id: 4, nombre: 'Carlos', apellido: 'Fernández', edad: 50, dni: '44332211', especialidad: 'Dermatología', mail: '', password: '', imagenPerfil: '' },
    { id: 5, nombre: 'Sofía', apellido: 'Suárez', edad: 35, dni: '55667788', especialidad: 'Pediatría', mail: '', password: '', imagenPerfil: '' },
    // … más especialistas
  ];



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

  /** Agrupa las visitas por mes y devuelve un array [mes, cantidad] */
  // getVisitasPorMes(): Observable<[string, number][]> {
  //   return of(this.visitasMock).pipe(
  //     map(visitas => {
  //       const meses = [
  //         'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  //         'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  //       ];
  //       const contador: Record<string, number> = {};

  //       visitas.forEach(v => {
  //         const mesNombre = meses[v.fecha.getMonth()];
  //         contador[mesNombre] = (contador[mesNombre] || 0) + 1;
  //       });

  //       // Aseguramos que todos los meses aparezcan (incluso con 0)
  //       return meses.map(m => [m, contador[m] || 0] as [string, number]);
  //     })
  //   );
  // }

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
    // → MOCK: cambia por tu endpoint real
    return of([
      ['Cardiología', 45],
      ['Pediatría', 32],
      ['Dermatología', 28],
      ['Traumatología', 18],
      ['Ginecología', 22],
    ]);
    // con un rest
    // return this.http.get<[string, number][]>('/api/estadisticas/pacientes-por-especialidad');
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

