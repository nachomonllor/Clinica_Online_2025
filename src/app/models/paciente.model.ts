
// // src/app/models/paciente.model.ts
// export interface Paciente {

  
//   id: string;             // <-- campo para identificarlo
//   avatarUrl: string;      // <-- para la imagen en la lista

//   nombre: string;
//   apellido: string;
//   edad: number;
//   dni: string;
//   obraSocial: string;
//   email: string;
//   password: string;


//   // Si vas a manejar los archivos directamente como File:
//   imagenPerfil1: File;
//   imagenPerfil2: File;
//   // Si prefieres trabajar con URLs/base64:
//   // imagenPerfil1: string;
//   // imagenPerfil2: string;
// }


export interface PacienteRegistro {
  nombre: string;
  apellido: string;
  edad: number;
  dni: string;
  obraSocial: string;
  email: string;
  password: string;
  imagenPerfil1: File;
  imagenPerfil2: File;
}

export interface Paciente extends PacienteRegistro {
  id: string;
  avatarUrl: string;
}



