import { Component, Inject, OnInit } from '@angular/core';
import { Turno } from '../models/turno.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import {  ViewChild, TemplateRef } from '@angular/core';


@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.css'
})

export class MisTurnosComponent implements OnInit {

  displayedColumns: string[] = ['id','fecha','hora','especialidad','especialista','estado','acciones'];
  dataSource = new MatTableDataSource<Turno>([]);
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;


  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    const turnosMock: Turno[] = [
      { id: 1, fecha: '2025-03-30', hora: '09:00', especialidad: 'Cardiología', especialista: 'Dr. Juan Pérez', estado: 'pendiente' },
      { id: 2, fecha: '2025-04-02', hora: '10:30', especialidad: 'Dermatología', especialista: 'Dra. Marta López', estado: 'realizado', resena: 'Buena atención, muy profesional.' },
      { id: 3, fecha: '2025-04-05', hora: '08:30', especialidad: 'Neurología', especialista: 'Dr. Carlos Ruiz', estado: 'realizado' }
    ];
    this.dataSource.data = turnosMock;

    // Configuro filtro para buscar en especialidad y especialista
    this.dataSource.filterPredicate = (turno, filter) =>
      turno.especialidad.toLowerCase().includes(filter)
      || turno.especialista.toLowerCase().includes(filter);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cancelarTurno(turno: Turno): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { message: `¿Cancelar turno #${turno.id}?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        turno.estado = 'cancelado';
        this.snackBar.open(`Turno ${turno.id} cancelado`, 'Cerrar', { duration: 2000 });
      }
    });
  }

  verResena(turno: Turno): void {
    this.snackBar.open(turno.resena!, 'Cerrar', { duration: 4000 });
  }

  turnos: Turno[] = [];
  filteredTurnos: Turno[] = [];
  filterTerm: string = '';
  searchText: any;


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

export class ConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
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
