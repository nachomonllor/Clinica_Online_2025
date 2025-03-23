import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TurnoEspecialista } from '../models/turno-especialista.model';
 
@Component({
  selector: 'app-turnos-especialista',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './turnos-especialista.component.html',
  styleUrl: './turnos-especialista.component.css'
})

export class TurnosEspecialistaComponent implements OnInit {
  turnos: TurnoEspecialista[] = [];
  filteredTurnos: TurnoEspecialista[] = [];
  filterTerm: string = '';

  constructor() { }

  ngOnInit(): void {
    // Datos simulados para turnos asignados
    this.turnos = [
      { id: 1, fecha: '2025-03-30', hora: '09:00', especialidad: 'Cardiología', paciente: 'María Gómez', estado: 'pendiente' },
      { id: 2, fecha: '2025-04-01', hora: '10:00', especialidad: 'Dermatología', paciente: 'Luis Rodríguez', estado: 'aceptado' },
      { id: 3, fecha: '2025-04-03', hora: '11:00', especialidad: 'Neurología', paciente: 'Ana Torres', estado: 'pendiente' },
      { id: 4, fecha: '2025-04-05', hora: '08:30', especialidad: 'Cardiología', paciente: 'Carlos Pérez', estado: 'realizado', resena: 'Consulta satisfactoria.' }
    ];
    this.filteredTurnos = this.turnos;
  }

  onFilterChange(): void {
    const term = this.filterTerm.trim().toLowerCase();
    if (term) {
      this.filteredTurnos = this.turnos.filter(turno =>
        turno.especialidad.toLowerCase().includes(term) ||
        turno.paciente.toLowerCase().includes(term)
      );
    } else {
      this.filteredTurnos = this.turnos;
    }
  }

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
}