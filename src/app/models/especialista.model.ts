// models/especialista.model.ts
export interface Especialista {
    nombre: string;
    apellido: string;
    edad: number;
    dni: string;
    // La especialidad se maneja como un string para que se pueda elegir de un listado o agregar una nueva
    especialidad?: string;
    mail: string;
    password: string;
    imagenPerfil: string;
}

  