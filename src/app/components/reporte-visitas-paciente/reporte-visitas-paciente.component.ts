
// reporte-visitas-paciente.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2GoogleChartsModule, GoogleChartInterface } from 'ng2-google-charts';
import { Turno } from '../../models/turno.model';
import { Paciente } from '../../models/paciente.model';
import { TurnoService } from '../../services/turno.service';

@Component({
  standalone: true,
  selector: 'app-reporte-visitas-paciente',
  imports: [CommonModule, Ng2GoogleChartsModule],
  templateUrl: './reporte-visitas-paciente.component.html',
  styleUrl: './reporte-visitas-paciente.component.scss'
})

export class ReporteVisitasPacienteComponent implements OnInit {
  pacientes: Paciente[] = [];
  selectedPacienteId: string | null = null;
  turnos: Turno[] = [];

  public turnosChart: GoogleChartInterface = {
    chartType: 'PieChart',
    // Ahora lo tipamos como any[][]
    dataTable: [] as any[][],
    options: { title: 'Turnos por estado', height: 300 }
  };

  constructor(private turnoSvc: TurnoService) { }

  ngOnInit() {
    // Cargamos sólo los pacientes, NO el chart global
    this.turnoSvc.getPacientes().subscribe((ps: Paciente[]) => this.pacientes = ps);
  }

  public selectPaciente(id: string) {
    this.turnoSvc.getTurnosPorPaciente(id).subscribe((lista: Turno[]) => {
      console.log('turnos de', id, lista);
      this.turnos = lista;
      this.actualizarChart(lista);
    });
  }

  private actualizarChart(lista: Turno[]) {
    // 1) Armo el contador como antes
    const contador: Record<string, number> = {};
    for (let i = 0; i < lista.length; i++) {
      const est = lista[i].estado;
      if (contador.hasOwnProperty(est)) {
        contador[est]++;
      } else {
        contador[est] = 1;
      }
    }

    // 2) Creo el dataTable completo (header + filas)
    const data: any[][] = [['Estado', 'Cantidad']];
    for (const key in contador) {
      if (contador.hasOwnProperty(key)) {
        data.push([key, contador[key]]);
      }
    }

    // 3) Reasigno todo el objeto para forzar redraw
    this.turnosChart = {
      chartType: 'PieChart',
      dataTable: data,
      options: {
        title: 'Turnos por estado',
        height: 300
      }
    };
  }


}


  // private actualizarChart(lista: Turno[]) {
  //   // Usamos any[][] para aceptar strings y numbers mezclados
  //   const data: any[][] = [];

  //   // 1) Encabezados (string,string)
  //   data.push(['Estado', 'Cantidad']);

  //   // 2) Filas de datos (string,number)
  //   const contador: Record<string, number> = {};
  //   for (let i = 0; i < lista.length; i++) {
  //     const est = lista[i].estado;
  //     if (contador.hasOwnProperty(est)) {
  //       contador[est]++;
  //     } else {
  //       contador[est] = 1;
  //     }
  //   }
  //   for (const key in contador) {
  //     if (contador.hasOwnProperty(key)) {
  //       data.push([key, contador[key]]);
  //     }
  //   }

  //   // 3) Reasignamos todo el objeto para forzar redraw
  //   // this.turnosChart = {
  //   //   chartType: 'PieChart',
  //   //   dataTable: data,
  //   //   options: this.turnosChart.options
  //   // };

  //   this.turnosChart = {
  //     chartType: 'PieChart',
  //     dataTable: data,                   // tu nuevo array con ['Estado','Cantidad'], … 
  //     options: {
  //       ...this.turnosChart.options      // o redefinilo acá si querés
  //     }
  //   };

  // }



// // reporte-visitas-paciente.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Ng2GoogleChartsModule, GoogleChartInterface } from 'ng2-google-charts';
// import { Paciente } from '../../models/paciente.model';
// import { TurnoService } from '../../services/turno.service';
// import { Turno } from '../../models/turno.model';

// @Component({
//   standalone: true,
//   selector: 'app-reporte-visitas-paciente',
//   imports: [CommonModule, Ng2GoogleChartsModule],
//   templateUrl: './reporte-visitas-paciente.component.html'
// })
// export class ReporteVisitasPacienteComponent implements OnInit {
//   pacientes: Paciente[] = [];
//   selectedPacienteId: string | null = null;

//   turnos: Turno[] = [];
//   public turnosChart: GoogleChartInterface = {
//     chartType: 'PieChart',
//     dataTable: [['Estado','Cantidad']],
//     options: { title: 'Turnos por estado', height: 300 }
//   };

//   constructor(private turnosSvc: TurnoService) {}

//   ngOnInit() {
//     this.turnosSvc.getPacientes().subscribe(ps => this.pacientes = ps);
//   }

//   selectPaciente(id: string) {
//     this.selectedPacienteId = id;
//     this.turnosSvc.getTurnosPorPaciente(id).subscribe(lista => {
//       this.turnos = lista;
//       this.actualizarChart(lista);
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
//     this.turnosChart = { ...this.turnosChart, dataTable: data };
//   }
// }



