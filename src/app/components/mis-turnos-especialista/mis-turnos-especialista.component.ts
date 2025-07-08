// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-mis-turnos-especialista',
//   imports: [],
//   templateUrl: './mis-turnos-especialista.component.html',
//   styleUrl: './mis-turnos-especialista.component.scss'
// })
// export class MisTurnosEspecialistaComponent {

// }


import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { Turno } from '../../models/turno.model';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-mis-turnos-especialista',
  standalone: true,
  templateUrl: './mis-turnos-especialista.component.html',
  styleUrl: './mis-turnos-especialista.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class MisTurnosEspecialistaComponent implements OnInit {
  displayedColumns = [
    'id', 'fecha', 'hora', 'especialidad', 'paciente', 'estado', 'acciones'
  ];
  dataSource = new MatTableDataSource<Turno>([]);
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<unknown>;

  constructor(
    private turnoService: TurnoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.turnoService.getMockTurnos().subscribe(turnos => {
      // filtramos solo los tuyos; para el mock dejamos todos
      this.dataSource.data = turnos;
      this.dataSource.filterPredicate = (t, f) =>
        t.especialidad.toLowerCase().includes(f) ||
        String(t.pacienteId).toLowerCase().includes(f);
    });
  }

  applyFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  /** Aceptar turno */
  aceptarTurno(turno: Turno): void {
    // *ngIf permite sólo si estado ≠ realizado, cancelado, rechazado
    turno.estado = 'aceptado';
    this.snackBar.open(`Turno ${turno.id} aceptado`, 'Cerrar', { duration: 2000 });
    this.dataSource.data = [...this.dataSource.data];
  }

  /** Rechazar turno: abre diálogo y deja comentario */
  rechazarTurno(turno: Turno): void {
    const ref = this.dialog.open(this.confirmDialog, {
      data: { message: `Indica motivo de rechazo para el turno #${turno.id}` }
    });
    ref.afterClosed().subscribe(ok => {
      if (ok) {
        turno.estado = 'rechazado';
        this.snackBar.open(`Turno ${turno.id} rechazado`, 'Cerrar', { duration: 2000 });
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  /** Cancelar turno: abre diálogo y deja comentario */
  cancelarTurno(turno: Turno): void {
    const ref = this.dialog.open(this.confirmDialog, {
      data: { message: `Indica motivo de cancelación para el turno #${turno.id}` }
    });
    ref.afterClosed().subscribe(ok => {
      if (ok) {
        turno.estado = 'cancelado';
        this.snackBar.open(`Turno ${turno.id} cancelado`, 'Cerrar', { duration: 2000 });
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  /** Finalizar turno: abre diálogo para dejar reseña */
  finalizarTurno(turno: Turno): void {
    const ref = this.dialog.open(this.confirmDialog, {
      data: { message: `Deja tu reseña para el turno #${turno.id}` }
    });
    ref.afterClosed().subscribe(ok => {
      if (ok) {
        turno.estado = 'realizado';
        turno.resena = 'RESENA DE EJEMPLO'; // luego toma del formulario
        this.snackBar.open(`Turno ${turno.id} finalizado`, 'Cerrar', { duration: 2000 });
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  /** Ver reseña (igual que en paciente) */
  verResena(turno: Turno): void {
    this.snackBar.open(turno.resena ?? 'Sin reseña', 'Cerrar', { duration: 4000 });
  }
}
