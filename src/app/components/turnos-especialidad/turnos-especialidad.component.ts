import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-turnos-especialidad',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './turnos-especialidad.component.html',
  styleUrl: './turnos-especialidad.component.scss'
})
export class TurnosEspecialidadComponent implements OnInit {

  constructor(private turnoService: TurnoService) { }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Turnos' }
    ]
  };


  ngOnInit(): void {
  this.turnoService.getVisitasPorEspecialidad()
    .subscribe((counts: [string, number][]) => {
      this.actualizarChart(counts);
    });
}

  private actualizarChart(counts: [string, number][]) {
    // labels: string[]
    this.barChartData.labels = counts.map(c => c[0]);
    // data: number[]
    this.barChartData.datasets[0].data = counts.map(c => c[1]);
  }

}


