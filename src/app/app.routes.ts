import { Routes } from '@angular/router';
import { LoginPacienteComponent } from './login-paciente/login-paciente.component';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { TurnosEspecialistaComponent } from './turnos-especialista/turnos-especialista.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPacienteComponent },
  { path: 'registro', component: RegistroPacienteComponent },
  { path: 'usuario-admin', component: UsuariosAdminComponent},
  { path: 'turno', component: MisTurnosComponent},
  { path: 'turno-especialista', component: TurnosEspecialistaComponent },
  { path: 'solicitar-turno', component: SolicitarTurnoComponent},
  { path: 'historia-clinica', component: HistoriaClinicaComponent},
  { path: '**', redirectTo: 'login' } // Ruta comodín para redirigir a login en rutas no definidas
];

