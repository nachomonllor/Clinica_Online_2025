
export interface Turno {
  pacienteId?: string;
  id: number;
  fecha: Date;            // reemplazo string por DATE
  hora: string;
  especialidad: string;
  especialista: string;
  estado: 'pendiente' | 'realizado' | 'cancelado' | 'rechazado' | 'aceptado';
  resena?: string;
  encuesta?: boolean;
  calificacion?: number;
}

// turno.model.ts
export type TurnoEstado = 
  | 'pendiente'
  | 'realizado'
  | 'cancelado'
  | 'rechazado'
  | 'aceptado';

export interface TurnoDto {
  pacienteId: string;
  id: number;
  fecha: string;
  hora: string;
  especialidad: string;
  especialista: string;
  estado: TurnoEstado;     // ← ahora es el mismo union
  resena?: string;
  encuesta?: boolean;
  calificacion?: number;
}


// export interface Turno {
//   pacienteId: any;
//   id: number;
//   fecha: string; // Para simplificar, string; en producción puede ser Date.
//   hora: string;
//   especialidad: string;
//   especialista: string;
//   estado: 'pendiente' | 'realizado' | 'cancelado' | 'rechazado' | 'aceptado';
//   resena?: string;         // Reseña o comentario dejado por el especialista.
//   encuesta?: boolean;      // Si el paciente ya completó la encuesta.
//   calificacion?: number;   // Puntaje 1–5 dado por el paciente.
// }


