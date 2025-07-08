// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class PacienteService {

//   constructor() { }
// }



// src/app/services/paciente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno.model';
import { Paciente } from '../models/paciente.model';
import { HistoriaClinica } from '../models/historia-clinica.model';

// src/app/services/paciente.service.ts

@Injectable({ providedIn: 'root' })
export class PacienteService {
  constructor(private http: HttpClient) { }

  // Trae todos los turnos del especialista
  getTurnosPorEspecialista(especialistaId: string): Observable<Turno[]> {
    return this.http.get<Turno[]>(`/api/turnos?especialista=${especialistaId}`);
  }

  /**
 * Devuelve sólo los pacientes que el especialista haya atendido al menos una vez.
 * La API debe aceptar el query param `atendidosPor` y devolver:
 * [{ id, nombre, apellido, avatarUrl, … }]
 */
  getPacientesAtendidos(especialistaId: string): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(
      `/api/pacientes?atendidosPor=${especialistaId}`
    );
  }

  // Detalles de un paciente
  getTurnosDePaciente(pacienteId: string, especialistaId: string): Observable<Turno[]> {
    return this.http.get<Turno[]>(`/api/turnos?paciente=${pacienteId}&especialista=${especialistaId}`);
  }

  getHistoriaClinica(pacienteId: string): Observable<HistoriaClinica> {
    return this.http.get<HistoriaClinica>(`/api/historias/${pacienteId}`);
  }
}
