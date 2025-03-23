import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Especialista } from '../models/especialista.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitar-turno',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './solicitar-turno.component.html',
  styleUrl: './solicitar-turno.component.css'
})

export class SolicitarTurnoComponent implements OnInit {
  turnoForm: FormGroup;
  // Lista simulada de especialidades y especialistas.
  especialidades: string[] = ['Cardiología', 'Dermatología', 'Neurología'];
  especialistas: Especialista[] = [
    {
      id: 1, nombre: 'Dr. Juan Pérez', especialidad: 'Cardiología',
      apellido: '',
      edad: 0,
      dni: '',
      mail: '',
      password: '',
      imagenPerfil: ''
    },
    {
      id: 2, nombre: 'Dra. Marta López', especialidad: 'Dermatología',
      apellido: '',
      edad: 0,
      dni: '',
      mail: '',
      password: '',
      imagenPerfil: ''
    },
    {
      id: 3, nombre: 'Dr. Carlos Ruiz', especialidad: 'Neurología',
      apellido: '',
      edad: 0,
      dni: '',
      mail: '',
      password: '',
      imagenPerfil: ''
    }
  ];
  // Fechas disponibles: próximos 15 días.
  availableDates: string[] = [];
  // Bandera para simular si el usuario actual es Administrador o no.
  isAdmin: boolean = false; // Ajusta este valor según el usuario autenticado.

  constructor(private fb: FormBuilder) {
    this.turnoForm = this.fb.group({
      especialidad: ['', Validators.required],
      especialista: ['', Validators.required],
      fecha: ['', Validators.required],
      horario: ['', Validators.required],
      // Campo adicional solo para Administrador.
      paciente: ['']
    });
  }

  ngOnInit(): void {
    this.generateAvailableDates();
  }

  // Genera un arreglo de fechas (formateadas como 'yyyy-mm-dd') para los próximos 15 días.
  generateAvailableDates(): void {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    this.availableDates = dates;
  }

  onSubmit(): void {
    if (this.turnoForm.valid) {
      const turnoData = this.turnoForm.value;
      console.log('Turno solicitado:', turnoData);
      // Aquí deberás integrar el servicio que guarde el turno (por ejemplo, en Firebase o mediante una API REST).
    } else {
      this.turnoForm.markAllAsTouched();
    }
  }
}