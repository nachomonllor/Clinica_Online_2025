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
import { Router } from '@angular/router';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-mis-turnos-paciente',
  standalone: true,
  templateUrl: './mis-turnos-paciente.component.html',
  styleUrl: './mis-turnos-paciente.component.scss',
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
export class MisTurnosPacienteComponent implements OnInit {

  displayedColumns: string[] = [
    'id', 'fecha', 'hora', 'especialidad', 'especialista', 'estado', 'acciones'
  ];

  dataSource = new MatTableDataSource<Turno>([]);

  // --- Datos mock para pruebas ---
  private mockTurnos: Turno[] = [
    {
      id: 100,
      fecha: new Date('2025-06-25'),
      hora: '09:30',
      especialidad: 'Cardio',
      especialista: 'Dra. Pérez',
      estado: 'aceptado',
      resena: 'Muy bien',
      encuesta: false,
      pacienteId: '1'
    },

    {
      id: 101,
      fecha: new Date('2025-06-25'),
      hora: '09:30',
      especialidad: 'Cardiología',
      especialista: 'Dra. Pérez',
      estado: 'aceptado',
      resena: 'Excelente atención, muy profesional.',
      encuesta: false,
      pacienteId: '2'
    },
    {
      id: 102,
      fecha: new Date('2025-06-28'),
      hora: '14:00',
      especialidad: 'Dermatología',
      especialista: 'Dr. Gómez',
      estado: 'realizado',
      resena: 'Me gustó mucho la consulta.',
      encuesta: true,
      pacienteId: '3'
    },
    {
      id: 103,
      fecha: new Date('2025-07-02'),
      hora: '11:15',
      especialidad: 'Pediatría',
      especialista: 'Dra. Ruiz',
      estado: 'pendiente',
      // sin reseña aún
      encuesta: false,
      pacienteId: '4'
    }
  ];

  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<unknown>;

  // constructor(
  //   private dialog: MatDialog,
  //   private snackBar: MatSnackBar,
  //   private router: Router
  // ) { }

  constructor(
    private turnoService: TurnoService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  // ngOnInit(): void {
  //   // Para usar mock,   asigno el array
  //   this.dataSource.data = this.mockTurnos;

  //   // Configuro el filtro único (especialidad o especialista)
  //   this.dataSource.filterPredicate = (t, f) =>
  //     t.especialidad.toLowerCase().includes(f) ||
  //     t.especialista.toLowerCase().includes(f);
  // }

  ngOnInit(): void {
    // en lugar de un mock local, llamas al servicio
    this.turnoService.getMockTurnos().subscribe(ts => {
      this.dataSource.data = ts;
      this.dataSource.filterPredicate = (t, f) =>
        t.especialidad.toLowerCase().includes(f) ||
        t.especialista.toLowerCase().includes(f);
    });
  }

  /** Buscar */
  public applyFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  /** Cancelar turno (solo si no está realizado) */
  public cancelarTurno(turno: Turno): void {
    const ref = this.dialog.open(this.confirmDialog, {
      data: { message: `¿Cancelar turno #${turno.id}?` }
    });

    ref.afterClosed().subscribe(ok => {
      if (ok) {
        turno.estado = 'cancelado';
        this.snackBar.open(`Turno ${turno.id} cancelado`, 'Cerrar', { duration: 2000 });
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  /** Ver reseña */
  // public verResena(turno: Turno): void {
  //   this.snackBar.open(turno.resena ?? 'Sin reseña', 'Cerrar', { duration: 4000 });
  // }

  public verResena(turno: Turno): void {
    this.router.navigate(['/resenia', turno.id]);
  }

  /** Completar encuesta */
  public completarEncuesta(turno: Turno): void {
    // Aquí podrías navegar a la ruta de la encuesta
  }

  /** Calificar atención */
  public calificarAtencion(turno: Turno): void {
    // Aquí podrías abrir diálogo o ruta de calificación
  }
}



// import { CommonModule } from '@angular/common';
// import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatCardModule } from '@angular/material/card';
// import { Turno } from '../../models/turno.model';
// import { TurnoService } from '../../turno.service';

// @Component({
//   selector: 'app-mis-turnos-paciente',
//   standalone: true,
//   templateUrl: './mis-turnos-paciente.component.html',
//   styleUrl: './mis-turnos-paciente.component.scss',
//   imports: [
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule,
//     MatTableModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatIconModule,
//     MatCardModule,
//     MatDialogModule,
//     MatSnackBarModule
//   ]
// })
// export class MisTurnosPacienteComponent implements OnInit {

//   displayedColumns: string[] = [
//     'id',
//     'fecha',
//     'hora',
//     'especialidad',
//     'especialista',
//     'estado',
//     'acciones'
//   ];

//   dataSource = new MatTableDataSource<Turno>([]);
//   @ViewChild('confirmDialog') confirmDialog!: TemplateRef<unknown>;

//   constructor(
//     private turnoService: TurnoService,
//     private dialog: MatDialog,
//     private snackBar: MatSnackBar
//   ) { }

//   ngOnInit(): void {
//     this.turnoService.getTurnosPaciente().subscribe(turnos => {
//       this.dataSource.data = turnos;

//       // filtro único (especialidad o especialista)
//       this.dataSource.filterPredicate = (t, f) =>
//         t.especialidad.toLowerCase().includes(f) ||
//         t.especialista.toLowerCase().includes(f);
//     });
//   }

//   /** Buscar */
//   applyFilter(value: string): void {
//     this.dataSource.filter = value.trim().toLowerCase();
//   }

//   /** Cancelar turno (solo si no está realizado) */
//   cancelarTurno(turno: Turno): void {
//     const ref = this.dialog.open(this.confirmDialog, {
//       data: { message: `¿Cancelar turno #${turno.id}?` }
//     });

//     ref.afterClosed().subscribe(ok => {
//       if (ok) {
//         /* aquí llamarías al endpoint */
//         turno.estado = 'cancelado';
//         this.snackBar.open(`Turno ${turno.id} cancelado`, 'Cerrar', { duration: 2000 });
//         this.dataSource.data = [...this.dataSource.data]; // refresca tabla
//       }
//     });
//   }
//   /** Ver reseña */
//   verResena(turno: Turno): void {
//     this.snackBar.open(turno.resena ?? 'Sin reseña', 'Cerrar', { duration: 4000 });
//   }

//   /** Completar encuesta – redirecciona o abre diálogo */
//   completarEncuesta(turno: Turno): void {
//     // TODO: navega a /encuesta/:id o abre diálogo
//   }

//   /** Calificar atención – redirecciona a componente de estrellas */
//   calificarAtencion(turno: Turno): void {
//     // TODO: navega a /calificar/:id o abre diálogo
//   }
// }


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-mis-turnos-paciente',
//   imports: [],
//   templateUrl: './mis-turnos-paciente.component.html',
//   styleUrl: './mis-turnos-paciente.component.scss'
// })
// export class MisTurnosPacienteComponent {

// }
