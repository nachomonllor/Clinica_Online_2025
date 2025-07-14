// turnos-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { TurnoService } from '../../services/turno.service';
import { Turno, TurnoEstado } from '../../models/turno.model';
import { ComentarioDialogComponent } from '../comentario-dialog/comentario-dialog.component';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-turnos-admin',
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TranslateModule,
  ],
  templateUrl: './turnos-admin.component.html',
  styleUrls: ['./turnos-admin.component.scss']  // <<-- Corrección aquí
})
export class TurnosAdminComponent implements OnInit {

  //displayedColumns = ['fecha', 'hora', 'especialidad', 'especialista', 'paciente', 'estado', 'acciones'];

  // turnos-admin.component.ts
  displayedColumns = [
    'fecha',   // no cambia: es el campo del modelo
    'hora',
    'especialidadNombre',
    'especialistaNombreApell',
    'pacienteId',
    'estado',
    'acciones'
  ];


  dataSource = new MatTableDataSource<Turno>([]);
  filtroCtrl = new FormControl('');

  constructor(
    private translate: TranslateService,
    private turnoService: TurnoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Inicializamos el idioma
    const lang = this.translate.getBrowserLang() ?? 'es';
    this.translate.use(['es', 'en'].includes(lang) ? lang : 'es');

    // Carga de datos…
    this.turnoService.getTurnos().subscribe(turnos => {
      this.dataSource.data = turnos;
      this.setupFilter();
    });
  }

  /** Llamado desde los botones de idioma */
  switchLang(lang: string) {
    this.translate.use(lang);
  }


  // ----------------------------------------------

  // displayedColumns = ['fecha', 'hora', 'especialidad', 'especialista', 'paciente', 'estado', 'acciones'];
  // dataSource = new MatTableDataSource<Turno>([]);
  // filtroCtrl = new FormControl('');

  // constructor(private turnoService: TurnoService,
  //   private dialog: MatDialog,
  //   private translate: TranslateService) {
  //   translate.addLangs(['es', 'en']);
  //   translate.setDefaultLang('es');
  //   // podrías detectar el navegador:
  //   // const browserLang = translate.getBrowserLang();
  //   // translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
  //   const lang = this.translate.getBrowserLang() ?? 'es';
  //   this.translate.use(['en', 'es'].includes(lang) ? lang : 'es');
  // }

  // ngOnInit(): void {
  //   this.turnoService.getTurnos().subscribe(turnos => {
  //     this.dataSource.data = turnos;
  //     this.setupFilter();
  //   });

  // }

  private setupFilter() {
    this.dataSource.filterPredicate = (t: Turno, filtro: string) => {
      const term = filtro.trim().toLowerCase();
      return t.especialidadNombre.toLowerCase().includes(term)
        || t.especialistaNombreApell.toLowerCase().includes(term);
    };
    this.filtroCtrl.valueChanges.subscribe(texto => {
      this.dataSource.filter = texto ?? '';
    });
  }

  canCancel(turno: Turno): boolean {
    return !['aceptado', 'realizado', 'rechazado'].includes(turno.estado);
  }

  cancelarTurno(turno: Turno) {
    const ref = this.dialog.open(ComentarioDialogComponent, {
      width: '400px',
      data: { motivo: '' }
    });
    ref.afterClosed().subscribe(resultado => {
      if (resultado?.motivo) {
        this.turnoService.cancelarTurno(turno.idTurno, resultado.motivo)
          .subscribe(() => {
            turno.estado = 'cancelado' as TurnoEstado;
            turno.resenaPaciente = resultado.motivo;
            this.dataSource._updateChangeSubscription();
          });
      }
    });
  }

}



// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormsModule } from '@angular/forms';
// import { MatTableDataSource } from '@angular/material/table';
// import { Turno, TurnoEstado } from '../../models/turno.model';
// import { MatDialog } from '@angular/material/dialog';
// import { TurnoService } from '../../services/turno.service';
// import { CommonModule } from '@angular/common';
// import { ComentarioDialogComponent } from '../comentario-dialog/comentario-dialog.component';
// import { MatFormField, MatLabel } from "@angular/material/form-field";
// import { MatCard, MatCardTitle } from "@angular/material/card";
// import { MatIcon } from "@angular/material/icon";

// @Component({
//   selector: 'app-turnos-admin',
//   imports: [CommonModule, FormsModule, MatFormField, MatLabel, MatCard, MatCardTitle, MatIcon],
//   templateUrl: './turnos-admin.component.html',
//   styleUrl: './turnos-admin.component.scss'
// })
// export class TurnosAdminComponent implements OnInit {
//   // columnas a mostrar en la tabla
//   displayedColumns = ['fecha', 'hora', 'especialidad', 'especialista', 'paciente', 'estado', 'acciones'];
//   dataSource = new MatTableDataSource<Turno>([]);

//   // filtro de texto único
//   filtroCtrl = new FormControl('');

//   constructor(
//     private turnoService: TurnoService,
//     private dialog: MatDialog
//   ) { }

//   ngOnInit(): void {
//     // 1) Cargar todos los turnos
//     this.turnoService.getTurnos().subscribe(turnos => {
//       this.dataSource.data = turnos;
//       this.setupFilter();
//     });
//   }


//   private setupFilter() {
//     // custom filterPredicate que busca en especialidad y especialista
//     this.dataSource.filterPredicate = (t: Turno, filtro: string) => {
//       const term = filtro.trim().toLowerCase();
//       return t.especialidadNombre.toLowerCase().includes(term)
//         || t.especialidadNombre.toLowerCase().includes(term);
//     };
//     // aplicar filtro cada vez que cambie el input
//     this.filtroCtrl.valueChanges.subscribe(texto => {
//       this.dataSource.filter = texto ?? '';
//     });
//   }

//   /**
//    * Decide si se muestra el botón "Cancelar" según el estado actual
//    * (solo si NO es Aceptado, Realizado ni Rechazado)
//    */
//   canCancel(turno: Turno): boolean {
//     return !['Aceptado', 'Realizado', 'Rechazado'].includes(turno.estado);
//   }

//   /** Abre un diálogo para que el administrador escriba un motivo de cancelación */
//   cancelarTurno(turno: Turno) {
//     const ref = this.dialog.open(ComentarioDialogComponent, {
//       width: '400px',
//       data: { motivo: '' }
//     });
//     ref.afterClosed().subscribe(resultado => {
//       if (resultado?.motivo) {
//         this.turnoService.cancelarTurno(turno.idTurno, resultado.motivo)
//           .subscribe(() => {
//             // refrescar lista o actualizar estado localmente
//             turno.estado = 'cancelado' as TurnoEstado;
//             turno.resenaEspecialista = resultado.motivo;
//             this.dataSource._updateChangeSubscription();
//           });
//       }
//     });
//   }

// }




