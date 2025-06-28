import { CommonModule }               from '@angular/common';
import { Component, OnInit }         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule }    from '@angular/material/card';
import { MatButtonModule }  from '@angular/material/button';
import { MatIconModule }    from '@angular/material/icon';
import { MatInputModule }   from '@angular/material/input';
import { MatTableModule }   from '@angular/material/table';
import { TurnoEspecialista } from '../models/turno-especialista.model';

@Component({
  selector: 'app-turnos-especialista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
  ],
  templateUrl: './turnos-especialista.component.html',
  styleUrls: ['./turnos-especialista.component.css']
})

export class TurnosEspecialistaComponent implements OnInit {

  turnos: TurnoEspecialista[] = [];
  filteredTurnos: TurnoEspecialista[] = [];
  filterTerm: string = '';

  // <-- columnas que se quieran mostrar
  displayedColumns: string[] = ['id','fecha','hora','especialidad','paciente','estado','acciones'];

  // Ahora dataSource apunta a un array simple
  dataSource: TurnoEspecialista[] = [];

  ngOnInit(): void {
    this.turnos = [
      { id: 1, fecha: '2025-03-30', hora: '09:00', especialidad: 'Cardiología', paciente: 'María Gómez', estado: 'pendiente' },
      { id: 2, fecha: '2025-04-01', hora: '10:00', especialidad: 'Dermatología', paciente: 'Luis Rodríguez', estado: 'aceptado' },
      { id: 3, fecha: '2025-04-03', hora: '11:00', especialidad: 'Neurología', paciente: 'Ana Torres', estado: 'pendiente' },
      { id: 4, fecha: '2025-04-05', hora: '08:30', especialidad: 'Cardiología', paciente: 'Carlos Pérez', estado: 'realizado', resena: 'Consulta satisfactoria.' }
    ];
    this.filteredTurnos = this.turnos;
    this.dataSource = this.filteredTurnos; // <-- asignamos dataSource
  }

  onFilterChange(): void {
    const term = this.filterTerm.trim().toLowerCase();
    this.filteredTurnos = term
      ? this.turnos.filter(t =>
          t.especialidad.toLowerCase().includes(term) ||
          t.paciente.toLowerCase().includes(term)
        )
      : this.turnos;
    this.dataSource = this.filteredTurnos; // <-- volvemos a asignar
  }

  //  // Para vincular con el input de filtrado
   filterText: string = '';

  cancelarTurno(turno: TurnoEspecialista): void {
    if (confirm(`¿Estás seguro de cancelar el turno ${turno.id}?`)) {
      const comentario = prompt("Ingresa el comentario de cancelación:");
      if (comentario) {
        console.log(`Turno ${turno.id} cancelado por: ${comentario}`);
        turno.estado = 'cancelado';
      }
    }
  }

  rechazarTurno(turno: TurnoEspecialista): void {
    if (confirm(`¿Estás seguro de rechazar el turno ${turno.id}?`)) {
      const comentario = prompt("Ingresa el comentario de rechazo:");
      if (comentario) {
        console.log(`Turno ${turno.id} rechazado por: ${comentario}`);
        turno.estado = 'rechazado';
      }
    }
  }

  aceptarTurno(turno: TurnoEspecialista): void {
    if (confirm(`¿Deseas aceptar el turno ${turno.id}?`)) {
      turno.estado = 'aceptado';
      console.log(`Turno ${turno.id} aceptado.`);
    }
  }

  finalizarTurno(turno: TurnoEspecialista): void {
    const comentario = prompt(`Finaliza el turno ${turno.id}. Ingresa la reseña o comentario de la consulta y diagnóstico:`);
    if (comentario) {
      turno.resena = comentario;
      turno.estado = 'realizado';
      console.log(`Turno ${turno.id} finalizado con reseña: ${comentario}`);
    }
  }

  verResena(turno: TurnoEspecialista): void {
    alert(`Reseña del turno ${turno.id}: ${turno.resena}`);
  }
  
  clearFilter() {
    this.filterText = '';
  }

}