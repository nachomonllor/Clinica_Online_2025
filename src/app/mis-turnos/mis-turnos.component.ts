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
  turnos: Turno[] = [];
  filteredTurnos: Turno[] = [];
  filterTerm: string = '';

  constructor() {}

  ngOnInit(): void {
    // Datos simulados: en un caso real, obtendrás estos datos desde un servicio.
    this.turnos = [
      { id: 1, fecha: '2025-03-30', hora: '09:00', especialidad: 'Cardiología', especialista: 'Dr. Juan Pérez', estado: 'pendiente' },
      { id: 2, fecha: '2025-04-02', hora: '10:30', especialidad: 'Dermatología', especialista: 'Dra. Marta López', estado: 'realizado', resena: 'Buena atención, muy profesional.' },
      { id: 3, fecha: '2025-04-05', hora: '08:30', especialidad: 'Neurología', especialista: 'Dr. Carlos Ruiz', estado: 'realizado' }
    ];
    this.filteredTurnos = this.turnos;
  }

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

  // Acción para cancelar turno: solicita un comentario y cambia el estado.
  cancelarTurno(turno: Turno): void {
    if (confirm(`¿Estás seguro de cancelar el turno ${turno.id}?`)) {
      const comentario = prompt("Ingresa el comentario de cancelación:");
      if (comentario) {
        console.log(`Turno ${turno.id} cancelado. Comentario: ${comentario}`);
        turno.estado = 'cancelado';
      }
    }
  }

  // Acción para ver reseña: muestra la reseña en un alert.
  verResena(turno: Turno): void {
    alert(`Reseña del turno ${turno.id}: ${turno.resena}`);
  }

  // Acción para completar encuesta: solicita mediante prompt el ingreso de la encuesta.
  completarEncuesta(turno: Turno): void {
    const encuesta = prompt(`Completa la encuesta para el turno ${turno.id}:\n¿Cómo calificas la atención?`);
    if (encuesta) {
      console.log(`Encuesta completada para turno ${turno.id}: ${encuesta}`);
      // Aquí puedes actualizar el turno o enviar la encuesta al backend.
    }
  }

  // Acción para calificar la atención: solicita un comentario sobre la atención recibida.
  calificarAtencion(turno: Turno): void {
    const comentario = prompt(`Califica la atención para el turno ${turno.id}:\nDeja tu comentario sobre la atención recibida:`);
    if (comentario) {
      console.log(`Atención calificada para turno ${turno.id}: ${comentario}`);
      // Aquí se manejaría el envío de la calificación.
    }
  }
}



// export class MisTurnosComponent implements OnInit {
//   // Lista completa de turnos (en un caso real, se obtendrían desde un servicio)
//   turnos: Turno[] = [];
//   // Lista filtrada que se mostrará en el template
//   filteredTurnos: Turno[] = [];
//   // Término del filtro (texto ingresado)
//   filterTerm: string = '';

//   constructor() {}

//   ngOnInit(): void {
//     // Simulación de carga de turnos solicitados por el paciente
//     this.turnos = [
//       { id: 1, fecha: '2025-03-30', hora: '09:00', especialidad: 'Cardiología', especialista: 'Dr. Juan Pérez' },
//       { id: 2, fecha: '2025-04-02', hora: '10:30', especialidad: 'Dermatología', especialista: 'Dra. Marta López' },
//       { id: 3, fecha: '2025-04-05', hora: '08:30', especialidad: 'Neurología', especialista: 'Dr. Carlos Ruiz' }
//     ];
//     // Inicialmente, se muestran todos los turnos
//     this.filteredTurnos = this.turnos;
//   }

//   // Método que filtra los turnos según el término ingresado
//   onFilterChange(): void {
//     const term = this.filterTerm.trim().toLowerCase();
//     if (term) {
//       this.filteredTurnos = this.turnos.filter(turno =>
//         turno.especialidad.toLowerCase().includes(term) ||
//         turno.especialista.toLowerCase().includes(term)
//       );
//     } else {
//       this.filteredTurnos = this.turnos;
//     }
//   }
// }
