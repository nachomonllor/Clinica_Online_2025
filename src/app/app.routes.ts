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
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { SeleccionarUsuarioLoginComponent } from './seleccionar-usuario-login/seleccionar-usuario-login.component';
import { SeleccionarUsuarioRegistroComponent } from './seleccionar-usuario-registro/seleccionar-usuario-registro.component';
import { LoginEspecialistaComponent } from './login-especialista/login-especialista.component';
import { LogTableComponent } from './log-table/log-table.component';

export const routes: Routes = [

  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },

  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login-paciente', component: LoginPacienteComponent },

  { path: 'registro-paciente', component: RegistroPacienteComponent },
  { path: 'registro-especialista', component: RegistroEspecialistaComponent},
  { path: 'mi-perfil', component: MiPerfilComponent},
  { path: 'mis-turnos', component: MisTurnosComponent},

  { path: 'pacientes', component: PacientesComponent},
  { path: 'listar-pacientes', component: ListarPacientesComponent},
  { path: 'seleccionar-usuario', component: SeleccionarUsuarioComponent},
  { path: 'usuario-admin', component: UsuariosAdminComponent},
  { path: 'turno', component: MisTurnosComponent},
  { path: 'turno-especialista', component: TurnosEspecialistaComponent },
  { path: 'solicitar-turno', component: SolicitarTurnoComponent},
  { path: 'historia-clinica', component: HistoriaClinicaComponent},
  { path: 'seleccionar-usuario-login', component: SeleccionarUsuarioLoginComponent },
  { path: 'seleccionar-usuario-registro', component: SeleccionarUsuarioRegistroComponent },

  {path: 'log-table', component: LogTableComponent},

    // Login específicos
  { path: 'login-paciente',       component: LoginPacienteComponent },
  { path: 'login-especialista',   component: LoginEspecialistaComponent },

  // Registro específicos
  { path: 'registro-paciente',      component: RegistroPacienteComponent },
  { path: 'registro-especialista',  component: RegistroEspecialistaComponent },



  { path: '**', redirectTo: 'welcome' } // Ruta comodín para redirigir a login en rutas no definidas

];

