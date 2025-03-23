import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-paciente',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login-paciente.component.html',
  styleUrl: './login-paciente.component.css'
})

export class LoginPacienteComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Solo se requiere email y password para el login
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      // Aquí integras el servicio de autenticación (por ejemplo, con Firebase)
      console.log('Datos de login del paciente:', loginData);
      // Llama al servicio de autenticación y maneja la respuesta (redireccionar, mostrar error, etc.)
    } else {
      // En caso de formulario inválido, marca todos los controles como "touched" para mostrar errores
      this.loginForm.markAllAsTouched();
    }
  }
}