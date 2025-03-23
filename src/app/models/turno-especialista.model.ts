
export interface TurnoEspecialista {
  id: number;
  fecha: string; // En producción podrías usar Date
  hora: string;
  especialidad: string;
  paciente: string;
  estado: 'pendiente' | 'aceptado' | 'realizado' | 'cancelado' | 'rechazado';
  resena?: string;
}
