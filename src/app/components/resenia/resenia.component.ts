import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { switchMap, map } from 'rxjs/operators';
import { TurnoService } from '../../services/turno.service';

import { Router } from '@angular/router';  // ← importa Router

@Component({
  selector: 'app-resenia',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './resenia.component.html',
  styleUrls: ['./resenia.component.scss']
})
export class ReseniaComponent implements OnInit {
  resena: string = 'Cargando reseña…';

  constructor(
    private route: ActivatedRoute,
    private turnoService: TurnoService,
    private router: Router              // ← inyecta Router

  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        // 1) Extrae el id COMO string (no lo conviertas a Number)
        map(params => params.get('id')!),               // id: string

        // 2) Pásalo directamente al service
        switchMap(id => this.turnoService.getMockTurnoById(id))
      )
      .subscribe(turno => {
        // 3) Usa la propiedad correcta: por ejemplo la reseña del paciente
        this.resena = turno?.resenaPaciente
          ?? 'Sin reseña disponible';
      });
  }


  public goBack(): void {
    this.router.navigate(['/mis-turnos-paciente']);
  }

}



  // ngOnInit(): void {
  //   this.route.paramMap
  //     .pipe(
  //       // extraer el id numérico de la URL
  //       map(params => Number(params.get('id'))),
  //       // pedir al servicio sólo ese turno
  //       switchMap(id => this.turnoService.getMockTurnoById(id))
  //     )
  //     .subscribe(turno => {
  //       this.resena = turno?.resena ?? 'Sin reseña disponible';
  //     });
  // }