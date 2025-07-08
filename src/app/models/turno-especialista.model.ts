
// src/app/models/turno-especialista.model.ts
export interface TurnoEspecialista {
  id: number;
  fecha: string;    // la mostrarás con un date pipe, o viene ya formateada
  hora: string;
  especialidad: string;
  paciente: string; // aquí guardas el nombre o “Nombre Apellido (ID)”
  estado: 'pendiente' | 'aceptado' | 'realizado' | 'cancelado' | 'rechazado';
  resena?: string;  // la reseña que deja el especialista
}



// export interface TurnoEspecialista {
//   id: number;
//   fecha: string; // En producción podrías usar Date
//   hora: string;
//   especialidad: string;
//   paciente: string;
//   estado: 'pendiente' | 'aceptado' | 'realizado' | 'cancelado' | 'rechazado';
//   resena?: string;
// }
