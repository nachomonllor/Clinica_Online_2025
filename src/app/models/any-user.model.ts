// any-user.model.ts

import { Administrador } from "./administrador.model";
import { Especialista } from "./especialista.model";
import { Paciente } from "./paciente.model";


// /** Unión de los tres perfiles */
// export type AnyUser = Paciente | Especialista | Administrador;

 // any-user.model.ts
export type AnyUser = Paciente & { perfil: 'Paciente' }
                    | Especialista & { perfil: 'Especialista' }
                    | Administrador & { perfil: 'Administrador' };
