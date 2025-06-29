
export interface Turno {
  id: number;
  fecha: string; // Para simplificar, string; en producción puede ser Date.
  hora: string;
  especialidad: string;
  especialista: string;
  estado: 'pendiente' | 'realizado' | 'cancelado' | 'rechazado' | 'aceptado';
  resena?: string;         // Reseña o comentario dejado por el especialista.
  encuesta?: boolean;      // Si el paciente ya completó la encuesta.
  calificacion?: number;   // Puntaje 1–5 dado por el paciente.
}


// export interface Turno {
//     id: number;
//     fecha: string; // Para simplificar, se usa string; en producción puedes usar Date.
//     hora: string;
//     especialidad: string;
//     especialista: string;
//     estado: 'pendiente' | 'realizado' | 'cancelado' | 'rechazado' | 'aceptado';
//     resena?: string; // Reseña o comentario dejado por el especialista, opcional.
//  }

// export interface Turno {
//     id: number;
//     fecha: string; // Puedes usar Date si lo prefieres
//     hora: string;
//     especialidad: string;
//     especialista: string;
//     // Otros campos que necesites
//   }