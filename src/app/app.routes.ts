import { Routes } from '@angular/router';
import { LoginPacienteComponent } from './login-paciente/login-paciente.component';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { TurnosEspecialistaComponent } from './turnos-especialista/turnos-especialista.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { SeleccionarUsuarioComponent } from './seleccionar-usuario/seleccionar-usuario.component';

export const routes: Routes = [

  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },

  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login-paciente', component: LoginPacienteComponent },
  { path: 'mi-perfil', component: MiPerfilComponent},
  { path: 'mis-turnos', component: MisTurnosComponent},
  { path: 'registro-paciente', component: RegistroPacienteComponent },
  { path: 'pacientes', component: PacientesComponent},
  { path: 'seleccionar-usuario', component: SeleccionarUsuarioComponent},
  { path: 'usuario-admin', component: UsuariosAdminComponent},
  { path: 'turno', component: MisTurnosComponent},
  { path: 'turno-especialista', component: TurnosEspecialistaComponent },
  { path: 'solicitar-turno', component: SolicitarTurnoComponent},
  { path: 'historia-clinica', component: HistoriaClinicaComponent},
  { path: '**', redirectTo: 'welcome' } // Ruta comodín para redirigir a login en rutas no definidas

];

