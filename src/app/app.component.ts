import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPacienteComponent } from './login-paciente/login-paciente.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPacienteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clinica-online-2025';
}
