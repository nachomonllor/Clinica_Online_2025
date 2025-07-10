import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface, Ng2GoogleChartsModule } from 'ng2-google-charts';  // ←
import { EstadisticasService } from '../../services/estadisticas.service';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [Ng2GoogleChartsModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.scss'
})
export class EstadisticasComponent implements OnInit {

  public visitasChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Mes', 'Visitas'],
      // aca irán los datos reales
    ],
    options: {
      title: 'Visitas por mes',
      height: 400,
      legend: { position: 'none' }
    }
  };


  public especialistasChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [['Especialidad', 'Cantidad']],
    options: {
      title: 'Especialistas por especialidad',
      height: 400
    }
  };

  constructor(private statsSvc: EstadisticasService) { }

  // ngOnInit() {
  //   // … cargas de visitas y pacientes
  //   // Carga de especialistas
  //   this.statsSvc.getEspecialistasPorEspecialidad().subscribe(data => {
  //     this.especialistasChart = {
  //       ...this.especialistasChart,
  //       dataTable: [['Especialidad', 'Cantidad'], ...data]
  //     };
  //   });
  // }

  ngOnInit() {
    // Carga visitas
    this.statsSvc.getVisitasPorMes().subscribe(data => {
      this.visitasChart = {
        ...this.visitasChart,
        dataTable: [['Mes', 'Visitas'], ...data]
      };
    });

    // Carga pacientes por especialidad
    this.statsSvc.getPacientesPorEspecialidad().subscribe(data => {
      this.pacientesChart = {
        ...this.pacientesChart,
        dataTable: [['Especialidad', 'Pacientes'], ...data]
      };
    });

    // Carga de especialistas
    this.statsSvc.getEspecialistasPorEspecialidad().subscribe(data => {
      this.especialistasChart = {
        ...this.especialistasChart,
        dataTable: [['Especialidad', 'Cantidad'], ...data]
      };
    });


  }

  public pacientesChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [['Especialidad', 'Pacientes']],
    options: {
      title: 'Pacientes por especialidad',
      height: 400
    }
  };


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