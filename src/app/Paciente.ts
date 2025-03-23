// models/paciente.model.ts
export interface Paciente {
  nombre: string;
  apellido: string;
  edad: number;
  dni: string;
  obraSocial: string;
  mail: string;
  password: string;
  // Aquí se espera que se almacenen exactamente 2 imágenes (por ejemplo, URLs o base64)
  imagenesPerfil: [string, string];
}

