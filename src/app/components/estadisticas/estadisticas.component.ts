import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface, Ng2GoogleChartsModule } from 'ng2-google-charts';  // ←
import { EstadisticasService } from '../../services/estadisticas.service';

@Component({
  selector: 'app-estadisticas',
  standalone:true,
  imports: [Ng2GoogleChartsModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.scss'
})
export class EstadisticasComponent implements OnInit{

  public visitasChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Mes', 'Visitas'],
      // aquí irán los datos reales
    ],
    options: {
      title: 'Visitas por mes',
      height: 400,
      legend: { position: 'none' }
    }
  };

  constructor(private statsSvc: EstadisticasService) {}

  ngOnInit() {
    this.statsSvc.getVisitasPorMes().subscribe(data => {
      // data: [ ['Enero', 10], ['Febrero', 23], … ]
      this.visitasChart = {
        ...this.visitasChart,
        dataTable: [
          ['Mes', 'Visitas'],
          ...data
        ]
      };
    });
  }

}



  //   public visitasChart = {
  //   chartType: 'ColumnChart',
  //   dataTable: [] as any[][],
  //   options: {
  //     title: 'Visitas por mes',
  //     height: 400,
  //     legend: { position: 'none' }
  //   }
  // };

  // constructor(private statsSvc: EstadisticasService) {}

  // ngOnInit() {
  //   this.statsSvc.getVisitasPorMes().subscribe(data => {
  //     // data: [ ['Enero', 10], ['Febrero', 23], … ]
  //     this.visitasChart.dataTable = [
  //       ['Mes', 'Visitas'],
  //       ...data
  //     ];
  //   });
  // }