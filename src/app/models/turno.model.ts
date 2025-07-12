// turno.model.ts
export type TurnoEstado =
  | 'pendiente'
  | 'realizado'
  | 'cancelado'
  | 'rechazado'
  | 'aceptado';

export interface Turno {
  idTurno: string;
  fecha: string;
  hora: string;
  especialidadNombre: string;
  especialistaNombreApell: string;
  especialistaId: string;  // FK
  pacienteId: string; //FK
  estado: TurnoEstado;
  // reseña que deja el especialista
  resenaEspecialista?: string;
  resenaPaciente: string;
  // comentario / calificación del paciente (opcional, si los usas)
  comentarioPaciente?: string;
  calificacionDelPaciente?: number;
  encuesta?: string;
}


