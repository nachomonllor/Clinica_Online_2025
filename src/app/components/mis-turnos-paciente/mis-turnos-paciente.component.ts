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
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<unknown>;

  displayedColumns: string[] = [
    'id', 'fecha', 'hora', 'especialidad', 'especialista', 'estado', 'acciones'
  ];
  filtroCtrl = new FormControl<string>('', { nonNullable: true });
  dataSource = new MatTableDataSource<Turno>();

  constructor(
    private turnoService: TurnoService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    // Configuración de idiomas
    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setDefaultLang('es');
  }

  /** Cambia el idioma de la interfaz */
  public switchLang(lang: string): void {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    // Detectar idioma del navegador
    const browserLang = this.translate.getBrowserLang() ?? 'es';
    this.translate.use(['es', 'en', 'pt'].includes(browserLang) ? browserLang : 'es');

    // Suscripción al usuario autenticado
    // this.authService.user$.subscribe(user => {
    //   if (!user) {
    //     // Redirige a login si no hay usuario
    //     this.router.navigate(['/login-paciente']);
    //     return;
    //   }
    //   this.turnoService.getTurnosPorPaciente(user.uid)
    //     .subscribe(ts => {
    //       this.dataSource.data = ts;
    //       this.setupFilter();
    //     });
    // });
  }

  private setupFilter(): void {
    this.dataSource.filterPredicate = (t: Turno, f: string) =>
      t.especialidadNombre.toLowerCase().includes(f) ||
      t.especialistaNombreApell.toLowerCase().includes(f);

    this.filtroCtrl.valueChanges.subscribe(texto => {
      this.dataSource.filter = texto.trim().toLowerCase();
    });
  }

  public cancelarTurno(t: Turno): void {
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

  public verResena(t: Turno): void {
    this.router.navigate(['/resenia', t.idTurno]);
  }

  public completarEncuesta(t: Turno): void {
    this.router.navigate(['/encuesta-atencion', t.idTurno]);
  }

  public calificarAtencion(t: Turno): void {
    // Implementar lógica de calificación
  }
}
