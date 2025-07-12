import { AvailableSlot } from "../components/solicitar-turno/solicitar-turno.component";

// models/especialista.model.ts
export interface Especialista {
    //availableSlots: any;
    idEspecialista: string,
    nombre: string;
    apellido: string;
    edad: number;
    dni: string;
    // La especialidad se maneja como un string para que se pueda elegir de un listado o agregar una nueva
    especialidadNombre?: string;
    mail: string;
    password: string;
    imagenPerfil: string;

    availableSlots?: AvailableSlot[];
}


// export interface Especialista {
//   idEspecialista: string;     // cambió a string para encajar con 'e1','e2',…
//   nombre:          string;
//   apellido:        string;
//   especialidad:    string;    // para filtrar por especialidad
//   availableSlots?: Slot[];    // para generar horarios
// }
