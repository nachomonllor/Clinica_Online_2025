// src/app/models/usuario-row.model.ts
export interface UsuarioRow {
  id:           string;
  perfil:       'Paciente' | 'Especialista' | 'Administrador';
  nombre:       string;
  apellido:     string;
  email:        string;
  activo?:      boolean;     // solo tiene sentido para Especialista
  imagenPerfil?: string;
}

