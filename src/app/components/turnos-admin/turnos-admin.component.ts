// import { Component } from '@angular/core';



import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Turno } from '../../models/turno.model';
import { MatDialog } from '@angular/material/dialog';
import { TurnoService } from '../../services/turno.service';
import { CommonModule } from '@angular/common';
import { ComentarioDialogComponent } from '../comentario-dialog/comentario-dialog.component';

@Component({
  selector: 'app-turnos-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './turnos-admin.component.html',
  styleUrl: './turnos-admin.component.scss'
})
export class TurnosAdminComponent implements OnInit {
  // columnas a mostrar en la tabla
  displayedColumns = ['fecha', 'hora', 'especialidad', 'especialista', 'paciente', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Turno>([]);

  // filtro de texto único
  filtroCtrl = new FormControl('');

  constructor(
    private turnoService: TurnoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // 1) Cargar todos los turnos
    this.turnoService.getTurnos().subscribe(turnos => {
      this.dataSource.data = turnos;
      this.setupFilter();
    });
  }

  private setupFilter() {
    // custom filterPredicate que busca en especialidad y especialista
    this.dataSource.filterPredicate = (t: Turno, filtro: string) => {
      const term = filtro.trim().toLowerCase();
      return t.especialidadNombre.toLowerCase().includes(term)
        || t.especialidadNombre.toLowerCase().includes(term);
    };
    // aplicar filtro cada vez que cambie el input
    this.filtroCtrl.valueChanges.subscribe(texto => {
      this.dataSource.filter = texto ?? '';
    });
  }

  /** 
   * Decide si se muestra el botón "Cancelar" según el estado actual 
   * (solo si NO es Aceptado, Realizado ni Rechazado)
   */
  canCancel(turno: Turno): boolean {
    return !['Aceptado', 'Realizado', 'Rechazado'].includes(turno.estado);
  }

  /** Abre un diálogo para que el administrador escriba un motivo de cancelación */
  cancelarTurno(turno: Turno) {
    const ref = this.dialog.open(ComentarioDialogComponent, {
      width: '400px',
      data: { motivo: '' }
    });
    ref.afterClosed().subscribe(resultado => {
      if (resultado?.motivo) {
        this.turnoService.cancelarTurno(turno.id, resultado.motivo)
          .subscribe(() => {
            // refrescar lista o actualizar estado localmente
            turno.estado = 'Cancelado';
            turno.resena = resultado.motivo;
            this.dataSource._updateChangeSubscription();
          });
      }
    });
  }
}

// @Component({
//   selector: 'app-turnos-admin',
//   imports: [],
//   templateUrl: './turnos-admin.component.html',
//   styleUrl: './turnos-admin.component.scss'
// })
// export class TurnosAdminComponent {

// }

