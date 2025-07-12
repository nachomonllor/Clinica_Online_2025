import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AuthService } from '../../services/auth.service';

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

  filtroCtrl = new FormControl<string>('', { nonNullable: true });

  //dataSource = new MatTableDataSource<Turno>([]);
  dataSource = new MatTableDataSource<Turno>();

  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<unknown>;

  constructor(
    private turnoService: TurnoService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService

  ) { }

  // ngOnInit(): void {
  //   // en lugar de un mock local, llamo al servicio
  //   this.turnoService.getTurnos().subscribe(ts => {
  //     this.dataSource.data = ts;
  //     this.dataSource.filterPredicate = (t, f) =>
  //       t.especialidadNombre.toLowerCase().includes(f) ||
  //       t.especialistaNombreApell.toLowerCase().includes(f);
  //   });
  // }


  ngOnInit(): void {
    // primero obtengo al usuario (firebase.User) y su uid
    this.authService.user$.subscribe(user => {
      if (!user) return;               // si no hay usuario logueado, nada
      const pacienteId = user.uid;     // uid como id de paciente

      // luego llamo al service con ese id
      this.turnoService.getTurnosPorPaciente(pacienteId)
        .subscribe(ts => {
          this.dataSource.data = ts;
          this.setupFilter();
        });
    });
  }

  private setupFilter() {
    this.dataSource.filterPredicate = (t: Turno, f: string) =>
      t.especialidadNombre.toLowerCase().includes(f) ||
      t.especialistaNombreApell.toLowerCase().includes(f);

    // si tienes un formControl para el filtro:
    this.filtroCtrl.valueChanges.subscribe(texto =>
      this.dataSource.filter = texto.trim().toLowerCase()
    );
  }

  /** Buscar */
  public applyFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  /** Cancelar turno (solo si no está realizado) */
  public cancelarTurno(turno: Turno): void {
    const ref = this.dialog.open(this.confirmDialog, {
      data: { message: `¿Cancelar turno #${turno.idTurno}?` }
    });

    ref.afterClosed().subscribe(ok => {
      if (ok) {
        turno.estado = 'cancelado';
        this.snackBar.open(`Turno ${turno.idTurno} cancelado`, 'Cerrar', { duration: 2000 });
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  public verResena(turno: Turno): void {
    this.router.navigate(['/resenia', turno.idTurno]);
  }

  /** Abrir la encuesta para el turno seleccionado */
  public completarEncuesta(turno: Turno): void {
    // Asumiendo que en routing esta esto:
    // { path: 'encuesta-atencion/:id', component: EncuestaAtencionComponent }
    this.router.navigate(['/encuesta-atencion', turno.idTurno]);
  }

  /** Calificar atención */
  public calificarAtencion(turno: Turno): void {
    // abrir diálogo o ruta de calificación
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
