
// reporte-visitas-paciente.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2GoogleChartsModule, GoogleChartInterface } from 'ng2-google-charts';
import { Paciente } from '../../models/paciente.model';
import { TurnoService } from '../../services/turno.service';
import { Turno } from '../../models/turno.model';

@Component({
  standalone: true,
  selector: 'app-reporte-visitas-paciente',
  imports: [CommonModule, Ng2GoogleChartsModule],
  templateUrl: './reporte-visitas-paciente.component.html'
})
export class ReporteVisitasPacienteComponent implements OnInit {
  pacientes: Paciente[] = [];
  selectedPacienteId: string | null = null;

  turnos: Turno[] = [];
  public turnosChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [['Estado','Cantidad']],
    options: { title: 'Turnos por estado', height: 300 }
  };

  constructor(private turnosSvc: TurnoService) {}

  ngOnInit() {
    this.turnosSvc.getPacientes().subscribe(ps => this.pacientes = ps);
  }

  selectPaciente(id: string) {
    this.selectedPacienteId = id;
    this.turnosSvc.getTurnosPorPaciente(id).subscribe(lista => {
      this.turnos = lista;
      this.actualizarChart(lista);
    });
  }

  private actualizarChart(lista: Turno[]) {
    const contador: Record<string, number> = {};
    for (let i = 0; i < lista.length; i++) {
      const est = lista[i].estado;
      if (contador.hasOwnProperty(est)) {
        contador[est]++;
      } else {
        contador[est] = 1;
      }
    }
    const data: any[][] = [['Estado','Cantidad']];
    for (const key in contador) {
      if (contador.hasOwnProperty(key)) {
        data.push([key, contador[key]]);
      }
    }
    this.turnosChart = { ...this.turnosChart, dataTable: data };
  }
}





// // reporte-visitas-paciente.component.ts
// import { Component, OnInit } from '@angular/core';
// import { FormControl, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Ng2GoogleChartsModule, GoogleChartInterface } from 'ng2-google-charts';
// import { Paciente } from '../../models/paciente.model';
// import { Turno } from '../../models/turno.model';
// import { TurnoService } from '../../services/turno.service';

// @Component({
//   standalone: true,
//   selector: 'app-reporte-visitas-paciente',
//   imports: [CommonModule, ReactiveFormsModule, Ng2GoogleChartsModule],
//   templateUrl: './reporte-visitas-paciente.component.html'
// })
// export class ReporteVisitasPacienteComponent implements OnInit {
//   // 1) Declara el array de pacientes (no solo el observable)
//   pacientes: Paciente[] = [];

//   // 2) El FormControl trabaja con string|null, que es el tipo de Paciente.id
//   pacienteControl = new FormControl<string | null>(null);

//   turnos: Turno[] = [];

//   public turnosChart: GoogleChartInterface = {
//     chartType: 'PieChart',
//     dataTable: [['Estado','Cantidad']],
//     options: { title: 'Turnos por estado', height: 300 }
//   };

//   constructor(private turnosSvc: TurnoService) {}

//   ngOnInit() {
//     // Suscribirse para cargar pacientes en el select
//     this.turnosSvc.getPacientes().subscribe(listado => {
//       this.pacientes = listado;
//     });

//     // Cuando cambie la selección de paciente
//     this.pacienteControl.valueChanges.subscribe(id => {
//       if (!id) {
//         this.turnos = [];
//         this.turnosChart.dataTable = [['Estado','Cantidad']];
//         return;
//       }
//       // id es string, getTurnosPorPaciente acepta string
//       this.turnosSvc.getTurnosPorPaciente(id).subscribe(lista => {
//         this.turnos = lista;
//         this.actualizarChart(lista);
//       });
//     });
//   }

//   private actualizarChart(lista: Turno[]) {
//     const contador: Record<string, number> = {};
//     for (let i = 0; i < lista.length; i++) {
//       const est = lista[i].estado;
//       if (contador.hasOwnProperty(est)) {
//         contador[est]++;
//       } else {
//         contador[est] = 1;
//       }
//     }
//     const data: any[][] = [['Estado','Cantidad']];
//     for (const key in contador) {
//       if (contador.hasOwnProperty(key)) {
//         data.push([key, contador[key]]);
//       }
//     }
//     this.turnosChart = {
//       ...this.turnosChart,
//       dataTable: data
//     };
//   }
// }

// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

