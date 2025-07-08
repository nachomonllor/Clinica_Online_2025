
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// Si tienes un API REST usa HttpClient:

@Injectable({ providedIn: 'root' })
export class EstadisticasService {
  
  constructor(private http: HttpClient) {}

  getVisitasPorMes(): Observable<[string, number][]> {
    // → Reemplaza este mock por tu llamada real a la base de datos/API:
    const mock: [string, number][] = [
      ['Enero', 12],
      ['Febrero', 25],
      ['Marzo', 18],
      ['Abril', 30],
      ['Mayo', 22],
      ['Junio', 15],
    ];
    return of(mock);

    // Ejemplo si usaras un endpoint REST:
    // return this.http.get<[string, number][]>('/api/estadisticas/visitas-por-mes');
  }


  getPacientesPorEspecialidad(): Observable<[string, number][]> {
    // → MOCK: cambia por tu endpoint real
    return of([
      ['Cardiología', 45],
      ['Pediatría',    32],
      ['Dermatología', 28],
      ['Traumatología',18],
      ['Ginecología',  22],


    ]);

      // con un rest
      // return this.http.get<[string, number][]>('/api/estadisticas/pacientes-por-especialidad');

  } 
}

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EstadisticasService {

//   constructor() { }
// }

