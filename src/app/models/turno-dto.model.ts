import { TurnoEstado } from "./turno.model";

export interface TurnoDto {
  pacienteId: string;
  id: string;
  fecha: string;
  hora: string;
  especialidad: string;
  especialista: string;
  estado: TurnoEstado;     // ← ahora es el mismo union
  resena?: string;
  encuesta?: string;
  calificacion?: string;
}



// export interface TurnoDto {
//   pacienteId: string;
//   id: string;
//   fecha: string;
//   hora: string;
//   especialidad: string;
//   especialista: string;
//   estado: string;
//   resena?: string;
//   encuesta?: string;
//   calificacion?: number;
// }
