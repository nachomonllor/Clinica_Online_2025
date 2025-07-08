import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { switchMap, map } from 'rxjs/operators';
import { TurnoService } from '../../services/turno.service';

import {  Router } from '@angular/router';  // ← importa Router

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
        // extraer el id numérico de la URL
        map(params => Number(params.get('id'))),
        // pedir al servicio sólo ese turno
        switchMap(id => this.turnoService.getMockTurnoById(id))
      )
      .subscribe(turno => {
        this.resena = turno?.resena ?? 'Sin reseña disponible';
      });
  }

  public goBack(): void {
    this.router.navigate(['/mis-turnos-paciente']);
  }

}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-resenia',
//   imports: [],
//   templateUrl: './resenia.component.html',
//   styleUrl: './resenia.component.scss'
// })
// export class ReseniaComponent {


// }
  // constructor(
  //   private route: ActivatedRoute,
  //   private turnoService: TurnoService
  // ) {}

  // ngOnInit(): void {
  //   this.route.paramMap.pipe(
  //     map(params => Number(params.get('id'))),
  //     switchMap(id =>
  //       // Asume que getTurnosPaciente devuelve solo los turnos del usuario logueado
  //       this.turnoService.getTurnosPaciente(/*pide aquí el pacienteId si lo necesitas*/)
  //         .pipe(
  //           map(turnos => turnos.find(t => t.id === id))
  //         )
  //     )
  //   ).subscribe(turno => {
  //     this.resena = turno?.resena ?? 'Sin reseña disponible';
  //   });
  // }