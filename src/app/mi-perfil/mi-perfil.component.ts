import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})

export class MiPerfilComponent implements OnInit {
  // Usuario simulado; en una aplicación real vendría del servicio de autenticación.
  usuario: Usuario = {
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan@example.com',
    imagenPerfil: 'https://via.placeholder.com/150',
    horarios: [
      { especialidad: 'Cardiología', dias: ['Lunes', 'Miércoles'], horas: ['09:00', '10:00'] },
      { especialidad: 'Neurología', dias: ['Martes'], horas: ['14:00'] }
    ]
  };

  // Formulario para agregar un nuevo horario.
  horarioForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.horarioForm = this.fb.group({
      especialidad: ['', Validators.required],
      dias: ['', Validators.required],
      horas: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  agregarHorario(): void {
    if (this.horarioForm.valid) {
      const nuevoHorario: Horario = {
        especialidad: this.horarioForm.value.especialidad,
        // Se espera que el usuario ingrese los días separados por coma.
        dias: this.horarioForm.value.dias.split(',').map((d: string) => d.trim()),
        // Se espera que el usuario ingrese las horas separadas por coma.
        horas: this.horarioForm.value.horas.split(',').map((h: string) => h.trim())
      };
      if (!this.usuario.horarios) {
        this.usuario.horarios = [];
      }
      this.usuario.horarios.push(nuevoHorario);
      console.log('Nuevo horario agregado:', nuevoHorario);
      this.horarioForm.reset();
    } else {
      this.horarioForm.markAllAsTouched();
    }
  }
}