import { Horario } from "./horario.model";

// src/app/models/usuario.model.ts 
export interface Usuario {
  id?:           string;      // opcional en creación
  perfil?:       'Paciente' | 'Especialista' | 'Administrador';
  nombre:        string;
  apellido:      string;
  email:         string;
  imagenPerfil?: string;
  horarios?:     Horario[];   // sólo si es especialista
  activo?:       boolean;     // sólo si es especialista
}



// interface Usuario {
//     nombre: string;
//     apellido: string;
//     email: string;
//     imagenPerfil: string;
//     // Si el usuario es Especialista, puede tener horarios asignados.
//     horarios?: Horario[];
//   }
  
  