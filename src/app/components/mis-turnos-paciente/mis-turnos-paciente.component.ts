
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
import { MatTooltipModule } from '@angular/material/tooltip';

import { Turno } from '../../models/turno.model';
import { Router } from '@angular/router';
import { TurnoService } from '../../services/turno.service';
import { AuthService } from '../../services/auth.service';

// ngx-translate
import { TranslateService, TranslateModule } from '@ngx-translate/core';

  import { filter, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-mis-turnos-paciente',
  standalone: true,
  templateUrl: './mis-turnos-paciente.component.html',
  styleUrls: ['./mis-turnos-paciente.component.scss'],
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
    MatSnackBarModule,
    MatTooltipModule,
    TranslateModule
  ]
})
export class MisTurnosPacienteComponent implements OnInit {

  // ========== Selector de idioma ==========
  constructor(
    private turnoService: TurnoService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setDefaultLang('es');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<unknown>;

  displayedColumns: string[] = [
    'id', 'fecha', 'hora', 'especialidad', 'especialista', 'estado', 'acciones'
  ];
  filtroCtrl = new FormControl<string>('', { nonNullable: true });
  dataSource = new MatTableDataSource<Turno>();

  ngOnInit(): void {
    const browserLang = this.translate.getBrowserLang() ?? 'es';
    this.translate.use(['es', 'en', 'pt'].includes(browserLang) ? browserLang : 'es');

    this.authService.user$.subscribe(user => {
      if (!user) return;
      this.turnoService.getTurnosPorPaciente(user.uid)
        .subscribe(ts => {
          this.dataSource.data = ts;
          this.setupFilter();
        });
    });
  }


// ngOnInit(): void {
//   // 1) Arranca con el idioma…
//   const browserLang = this.translate.getBrowserLang() ?? 'es';
//   this.translate.use(['es','en','pt'].includes(browserLang) ? browserLang : 'es');

//   // 2) Suscríbete al usuario logueado y luego al listado de turnos
//   this.authService.user$
//     .pipe(
//       filter((u): u is firebase.User => u !== null),
//       switchMap(u => this.turnoService.getTurnosPorPaciente(u.uid))
//     )
//     .subscribe(turnos => {
//       this.dataSource.data = turnos;
//       this.setupFilter();
//     });
// }


  private setupFilter() {
    this.dataSource.filterPredicate = (t: Turno, f: string) =>
      t.especialidadNombre.toLowerCase().includes(f) ||
      t.especialistaNombreApell.toLowerCase().includes(f);

    this.filtroCtrl.valueChanges.subscribe(texto =>
      this.dataSource.filter = texto.trim().toLowerCase()
    );
  }

  public cancelarTurno(t: Turno) {
    const ref = this.dialog.open(this.confirmDialog, {
      data: { message: this.translate.instant('MIS_SHIFTS.PATIENT.CONFIRM', { id: t.idTurno }) }
    });
    ref.afterClosed().subscribe(ok => {
      if (ok) {
        t.estado = 'cancelado';
        this.snackBar.open(
          this.translate.instant('MIS_SHIFTS.PATIENT.CANCELED', { id: t.idTurno }),
          this.translate.instant('COMMON.CLOSE'),
          { duration: 2000 }
        );
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  public verResena(t: Turno) {
    this.router.navigate(['/resenia', t.idTurno]);
  }

  public completarEncuesta(t: Turno) {
    this.router.navigate(['/encuesta-atencion', t.idTurno]);
  }

  public calificarAtencion(t: Turno) {
    // …
  }
}





// import { CommonModule } from '@angular/common';
// import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
// import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatCardModule } from '@angular/material/card';
// import { Turno } from '../../models/turno.model';
// import { Router } from '@angular/router';
// import { TurnoService } from '../../services/turno.service';
// import { AuthService } from '../../services/auth.service';

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
//     'id', 'fecha', 'hora', 'especialidad', 'especialista', 'estado', 'acciones'
//   ];

//   filtroCtrl = new FormControl<string>('', { nonNullable: true });

//   //dataSource = new MatTableDataSource<Turno>([]);
//   dataSource = new MatTableDataSource<Turno>();

//   @ViewChild('confirmDialog') confirmDialog!: TemplateRef<unknown>;

//   constructor(
//     private turnoService: TurnoService,
//     private router: Router,
//     private dialog: MatDialog,
//     private snackBar: MatSnackBar,
//     private authService: AuthService

//   ) { }

//   ngOnInit(): void {
//     // primero obtengo al usuario (firebase.User) y su uid
//     this.authService.user$.subscribe(user => {
//       if (!user) return;               // si no hay usuario logueado, nada
//       const pacienteId = user.uid;     // uid como id de paciente

//       // luego llamo al service con ese id
//       this.turnoService.getTurnosPorPaciente(pacienteId)
//         .subscribe(ts => {
//           this.dataSource.data = ts;
//           this.setupFilter();
//         });
//     });
//   }

//   private setupFilter() {
//     this.dataSource.filterPredicate = (t: Turno, f: string) =>
//       t.especialidadNombre.toLowerCase().includes(f) ||
//       t.especialistaNombreApell.toLowerCase().includes(f);

//     // si tienes un formControl para el filtro:
//     this.filtroCtrl.valueChanges.subscribe(texto =>
//       this.dataSource.filter = texto.trim().toLowerCase()
//     );
//   }


//   public applyFilter(value: string): void {
//     this.dataSource.filter = value.trim().toLowerCase();
//   }

//   public cancelarTurno(turno: Turno): void {
//     const ref = this.dialog.open(this.confirmDialog, {
//       data: { message: `¿Cancelar turno #${turno.idTurno}?` }
//     });

//     ref.afterClosed().subscribe(ok => {
//       if (ok) {
//         turno.estado = 'cancelado';
//         this.snackBar.open(`Turno ${turno.idTurno} cancelado`, 'Cerrar', { duration: 2000 });
//         this.dataSource.data = [...this.dataSource.data];
//       }
//     });
//   }

//   public verResena(turno: Turno): void {
//     this.router.navigate(['/resenia', turno.idTurno]);
//   }

//    public completarEncuesta(turno: Turno): void {
//     // Asumiendo que en routing esta esto:
//     // { path: 'encuesta-atencion/:id', component: EncuestaAtencionComponent }
//     this.router.navigate(['/encuesta-atencion', turno.idTurno]);
//   }

//   public calificarAtencion(turno: Turno): void {
//     // abrir diálogo o ruta de calificación
//   }
// }







// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-mis-turnos-paciente',
// //   imports: [],
// //   templateUrl: './mis-turnos-paciente.component.html',
// //   styleUrl: './mis-turnos-paciente.component.scss'
// // })
// // export class MisTurnosPacienteComponent {

// // }
