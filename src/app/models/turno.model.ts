// turno.model.ts
export type TurnoEstado = 
  | 'pendiente'
  | 'realizado'
  | 'cancelado'
  | 'rechazado'
  | 'aceptado';

export interface Turno {
  id: number;
  fecha: Date;
  hora: string;
  especialidad: string;
  especialista: string;
  pacienteId: string;
  estado: TurnoEstado;
  // reseña que deja el especialista
  resenaEspecialista?: string;
  resena:string;
  calificacion: number;
  // comentario / calificación del paciente (opcional, si los usas)
  comentarioPaciente?: string;
  calificacionPaciente?: number;
  encuesta?: boolean;
}

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

