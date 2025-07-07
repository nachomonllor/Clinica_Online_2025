
// src/app/components/turnos-especialidad/turnos-especialidad.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
 import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { CountByKey, TurnoService } from '../turno.service';
 
@Component({
  selector: 'app-turnos-especialidad',
  standalone: true,
  imports: [
    CommonModule,
   // NgChartsModule                                     // ← en imports
  ],
  templateUrl: './turnos-especialidad.component.html',
  styleUrls:   ['./turnos-especialidad.component.css']
})
export class TurnosEspecialidadComponent implements OnInit {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: { x: {}, y: { beginAtZero: true } }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Turnos' }]
  };

  constructor(private turnoService: TurnoService) {}

  ngOnInit(): void {
    this.turnoService.getTurnosByEspecialidad().subscribe((counts: CountByKey[]) => {
      this.barChartData.labels = counts.map(c => c.key);
      this.barChartData.datasets[0].data = counts.map(c => c.count);
    });
  }
}




// // src/app/components/turnos-especialidad-chart/turno-especialidad-chart.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
//  import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
// import { CountByKey, TurnoService } from '../turno.service';
 
 
// @Component({
//   selector: 'app-turno-especialidad-chart',
//   standalone: true,
//   imports: [ CommonModule ],
//   templateUrl: './turnos-especialidad.component.html',
//   styleUrl: './turnos-especialidad.component.scss'
// })
// export class TurnoEspecialidadChartComponent implements OnInit {
//   public barChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//     scales: {
//       x: {},
//       y: { beginAtZero: true }
//     }
//   };
//   public barChartType: ChartType = 'bar';
//   public barChartData: ChartData<'bar'> = {
//     labels: [],
//     datasets: [
//       { data: [], label: 'Turnos' }
//     ]
//   };

//   constructor(private turnoService: TurnoService) {}

//   ngOnInit(): void {
//     this.turnoService.getTurnosByEspecialidad().subscribe((counts: CountByKey[]) => {
//       this.barChartData.labels = counts.map(c => c.key);
//       this.barChartData.datasets[0].data = counts.map(c => c.count);
//     });
//   }
// }
