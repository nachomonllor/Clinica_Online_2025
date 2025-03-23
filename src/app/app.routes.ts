import { Routes } from '@angular/router';
import { LoginPacienteComponent } from './login-paciente/login-paciente.component';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPacienteComponent },
  { path: 'registro', component: RegistroPacienteComponent },
  { path: '**', redirectTo: 'login' } // Ruta comodín para redirigir a login en rutas no definidas
];
