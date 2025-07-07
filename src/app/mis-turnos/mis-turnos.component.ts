import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

import { Turno } from '../models/turno.model';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TurnoService } from '../turno.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,      // ← Agrega esto
    MatTooltipModule,
  ],
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {


  displayedColumns = [
    'id','fecha','hora','especialidad','especialista','estado','acciones'
  ];
  dataSource = new MatTableDataSource<Turno>([]);

  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private turnoSvc: TurnoService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // 1) Obtenemos los turnos del paciente
    this.turnoSvc.getTurnosPaciente()
      .subscribe(turnos => this.dataSource.data = turnos);

    // 2) Configuramos el filtro
    this.dataSource.filterPredicate = (turno, filter) =>
      turno.especialidad.toLowerCase().includes(filter) ||
      turno.especialista.toLowerCase().includes(filter);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cancelarTurno(turno: Turno): void {
    this.dialog.open(this.confirmDialog, {
      data: { message: `¿Cancelar turno #${turno.id}?` }
    })
    .afterClosed()
    .subscribe(async confirmed => {
      if (!confirmed) return;
      try {
        // Persistimos el cambio en Firebase
        await this.turnoSvc.actualizarTurno(turno.id!.toString(), { estado: 'cancelado' });
        // Actualizamos la fila localmente (opcional, ya que la suscripción recarga)
        turno.estado = 'cancelado';
        Swal.fire('Turno cancelado', `El turno #${turno.id} fue cancelado.`, 'success');
      } catch (err) {
        Swal.fire('Error', 'No se pudo cancelar el turno, intenta de nuevo.', 'error');
      }
    });
  }







  // displayedColumns: string[] = [
  //   'id',
  //   'fecha',
  //   'hora',
  //   'especialidad',
  //   'especialista',
  //   'estado',
  //   'acciones'
  // ];
 // dataSource = new MatTableDataSource<Turno>([]);

  //@ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

 // constructor(private dialog: MatDialog) {}

  // ngOnInit(): void {
  //   // Mock de datos; aquí cargarías desde tu servicio real
  //   const turnosMock: Turno[] = [
  //     {
  //       id: 1,
  //       fecha: '2025-03-30',
  //       hora: '09:00',
  //       especialidad: 'Cardiología',
  //       especialista: 'Dr. Juan Pérez',
  //       estado: 'pendiente',
  //       pacienteId : 1
  //     },
  //     {
  //       id: 2,
  //       fecha: '2025-04-02',
  //       hora: '10:30',
  //       especialidad: 'Dermatología',
  //       especialista: 'Dra. Marta López',
  //       estado: 'realizado',
  //       resena: 'Buena atención, muy profesional.',
  //       pacienteId :2
  //     },
  //     {
  //       id: 3,
  //       fecha: '2025-04-05',
  //       hora: '08:30',
  //       especialidad: 'Neurología',
  //       especialista: 'Dr. Carlos Ruiz',
  //       estado: 'realizado',
  //       pacienteId : 3
  //     }
  //   ];

  //   this.dataSource.data = turnosMock;

  //   // Configuramos el filtro para especialidad y especialista
  //   this.dataSource.filterPredicate = (turno, filter) =>
  //     turno.especialidad.toLowerCase().includes(filter) ||
  //     turno.especialista.toLowerCase().includes(filter);
  // }

  // applyFilter(filterValue: string): void {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  // cancelarTurno(turno: Turno): void {
  //   this.dialog
  //     .open(this.confirmDialog, {
  //       data: { message: `¿Cancelar turno #${turno.id}?` }
  //     })
  //     .afterClosed()
  //     .subscribe((result) => {
  //       if (result) {
  //         turno.estado = 'cancelado';
  //         Swal.fire({
  //           title: 'Turno cancelado',
  //           text: `El turno #${turno.id} fue cancelado.`,
  //           icon: 'success',
  //           confirmButtonText: 'Aceptar'
  //         });
  //       }
  //     });
  // }

  verResena(turno: Turno): void {
    Swal.fire({
      title: 'Reseña',
      text: turno.resena!,
      icon: 'info',
      confirmButtonText: 'Cerrar'
    });
  }

  completarEncuesta(turno: Turno): void {
    Swal.fire({
      title: 'Completar encuesta',
      html:
        '<p>Aquí iría tu formulario de encuesta embebido o un link a él.</p>',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        turno.encuesta = true;
        Swal.fire('¡Encuesta enviada!', '', 'success');
      }
    });
  }

  calificarAtencion(turno: Turno): void {
    Swal.fire({
      title: 'Calificar atención',
      input: 'range',
      inputAttributes: {
        min: '1',
        max: '5',
        step: '1'
      },
      inputValue: 3,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        turno.calificacion = Number(result.value);
        Swal.fire(
          '¡Gracias por tu calificación!',
          `Puntaje: ${result.value}`,
          'success'
        );
      }
    });
  }
}




// import { Component, Inject, OnInit } from '@angular/core';
// import { Turno } from '../models/turno.model';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatCardModule } from '@angular/material/card';

// import {  ViewChild, TemplateRef } from '@angular/core';

// @Component({
//   selector: 'app-mis-turnos',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule,
//     CommonModule,
//     FormsModule,
//     MatTableModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatIconModule,
//     MatCardModule,
//     MatDialogModule,
//     MatSnackBarModule,
//     MatDialogModule,
//     MatSnackBarModule
//   ],
//   templateUrl: './mis-turnos.component.html',
//   styleUrl: './mis-turnos.component.css'
// })

// export class MisTurnosComponent implements OnInit {

//   displayedColumns: string[] = ['id','fecha','hora','especialidad','especialista','estado','acciones'];
//   dataSource = new MatTableDataSource<Turno>([]);
//   @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

//   // … tus propiedades, dataSource, etc. …
//   constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

//   cancelarTurno(turno: Turno): void {
//     const dialogRef = this.dialog.open(this.confirmDialog, {
//       data: { message: `¿Cancelar turno #${turno.id}?` }
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         turno.estado = 'cancelado';
//         this.snackBar.open(`Turno ${turno.id} cancelado`, 'Cerrar', { duration: 2000 });
//       }
//     });
//   }

//   ngOnInit(): void {
//     const turnosMock: Turno[] = [
//       { id: 1, fecha: '2025-03-30', hora: '09:00', especialidad: 'Cardiología', especialista: 'Dr. Juan Pérez', estado: 'pendiente' },
//       { id: 2, fecha: '2025-04-02', hora: '10:30', especialidad: 'Dermatología', especialista: 'Dra. Marta López', estado: 'realizado', resena: 'Buena atención, muy profesional.' },
//       { id: 3, fecha: '2025-04-05', hora: '08:30', especialidad: 'Neurología', especialista: 'Dr. Carlos Ruiz', estado: 'realizado' }
//     ];
//     this.dataSource.data = turnosMock;

//     // Configuro filtro para buscar en especialidad y especialista
//     this.dataSource.filterPredicate = (turno, filter) =>
//       turno.especialidad.toLowerCase().includes(filter)
//       || turno.especialista.toLowerCase().includes(filter);
//   }

//   applyFilter(filterValue: string): void {
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }

//   // cancelarTurno(turno: Turno): void {
//   //   const dialogRef = this.dialog.open(ConfirmDialog, {
//   //     data: { message: `¿Cancelar turno #${turno.id}?` }
//   //   });
//   //   dialogRef.afterClosed().subscribe(result => {
//   //     if (result) {
//   //       turno.estado = 'cancelado';
//   //       this.snackBar.open(`Turno ${turno.id} cancelado`, 'Cerrar', { duration: 2000 });
//   //     }
//   //   });
//   // }

//   verResena(turno: Turno): void {
//     this.snackBar.open(turno.resena!, 'Cerrar', { duration: 4000 });
//   }

//   turnos: Turno[] = [];
//   filteredTurnos: Turno[] = [];
//   filterTerm: string = '';
//   searchText: any;


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


//   // Acción para completar encuesta: solicita mediante prompt el ingreso de la encuesta.
//   completarEncuesta(turno: Turno): void {
//     const encuesta = prompt(`Completa la encuesta para el turno ${turno.id}:\n¿Cómo calificas la atención?`);
//     if (encuesta) {
//       console.log(`Encuesta completada para turno ${turno.id}: ${encuesta}`);
//       // Aquí puedes actualizar el turno o enviar la encuesta al backend.
//     }
//   }

//   // Acción para calificar la atención: solicita un comentario sobre la atención recibida.
//   calificarAtencion(turno: Turno): void {
//     const comentario = prompt(`Califica la atención para el turno ${turno.id}:\nDeja tu comentario sobre la atención recibida:`);
//     if (comentario) {
//       console.log(`Atención calificada para turno ${turno.id}: ${comentario}`);
//       // Aquí se manejaría el envío de la calificación.
//     }
//   }
// }

// export class ConfirmDialog {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
// }



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
