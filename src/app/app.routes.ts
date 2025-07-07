import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HistoriaClinicaComponent } from './components/historia-clinica/historia-clinica.component';
import { ListarPacientesComponent } from './components/listar-pacientes/listar-pacientes.component';
import { LogTableComponent } from './components/log-table/log-table.component';
import { LoginEspecialistaComponent } from './components/login-especialista/login-especialista.component';
import { LoginPacienteComponent } from './components/login-paciente/login-paciente.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { RegistroEspecialistaComponent } from './components/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './components/registro-paciente/registro-paciente.component';
import { SeleccionarUsuarioLoginComponent } from './components/seleccionar-usuario-login/seleccionar-usuario-login.component';
import { SeleccionarUsuarioRegistroComponent } from './components/seleccionar-usuario-registro/seleccionar-usuario-registro.component';
import { SeleccionarUsuarioComponent } from './components/seleccionar-usuario/seleccionar-usuario.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { TurnosEspecialidadComponent } from './components/turnos-especialidad/turnos-especialidad.component';
import { TurnosEspecialistaComponent } from './components/turnos-especialista/turnos-especialista.component';
import { UsuariosAdminComponent } from './components/usuarios-admin/usuarios-admin.component';

export const routes: Routes = [

  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },


  { path: '', redirectTo: 'logs', pathMatch: 'full' },
  // {
  //   path: 'logs',
  //   loadComponent: () =>
  //     import('./app/log-table/log-table.component')
  //       .then(c => c.LogTableComponent)
  // },
  // {
  //   path: 'especialidades',
  //   loadComponent: () =>
  //     import('./app/turnos-especialidad/turnos-especialidad.component')
  //       .then(c => c.TurnosEspecialidadComponent)
  // },



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

  { path: 'turnos-especialidad', component: TurnosEspecialidadComponent},

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

