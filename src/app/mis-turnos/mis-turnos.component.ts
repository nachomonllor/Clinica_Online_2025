import { Component, OnInit } from '@angular/core';
import { Turno } from '../models/turno.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.css'
})

export class MisTurnosComponent implements OnInit {
  // Lista completa de turnos (en un caso real, se obtendrían desde un servicio)
  turnos: Turno[] = [];
  // Lista filtrada que se mostrará en el template
  filteredTurnos: Turno[] = [];
  // Término del filtro (texto ingresado)
  filterTerm: string = '';

  constructor() {}

  ngOnInit(): void {
    // Simulación de carga de turnos solicitados por el paciente
    this.turnos = [
      { id: 1, fecha: '2025-03-30', hora: '09:00', especialidad: 'Cardiología', especialista: 'Dr. Juan Pérez' },
      { id: 2, fecha: '2025-04-02', hora: '10:30', especialidad: 'Dermatología', especialista: 'Dra. Marta López' },
      { id: 3, fecha: '2025-04-05', hora: '08:30', especialidad: 'Neurología', especialista: 'Dr. Carlos Ruiz' }
    ];
    // Inicialmente, se muestran todos los turnos
    this.filteredTurnos = this.turnos;
  }

  // Método que filtra los turnos según el término ingresado
  onFilterChange(): void {
    const term = this.filterTerm.trim().toLowerCase();
    if (term) {
      this.filteredTurnos = this.turnos.filter(turno =>
        turno.especialidad.toLowerCase().includes(term) ||
        turno.especialista.toLowerCase().includes(term)
      );
    } else {
      this.filteredTurnos = this.turnos;
    }
  }
}
