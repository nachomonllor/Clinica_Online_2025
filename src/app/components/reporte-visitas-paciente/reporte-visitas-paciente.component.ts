
// reporte-visitas-paciente.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Ng2GoogleChartsModule,
  GoogleChartInterface
} from 'ng2-google-charts';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule }  from '@angular/material/card';

import { TurnoService } from '../../services/turno.service';
import { Paciente }     from '../../models/paciente.model';
import { Turno }        from '../../models/turno.model';

@Component({
  standalone: true,
  selector: 'app-reporte-visitas-paciente',
  imports: [
    CommonModule,
    Ng2GoogleChartsModule,
    MatCardModule,
    MatTableModule      // ← Angular Material table
  ],
  templateUrl: './reporte-visitas-paciente.component.html',
  styleUrls: ['./reporte-visitas-paciente.component.scss']
})
export class ReporteVisitasPacienteComponent implements OnInit {
  pacientes: Paciente[] = [];
  selectedPacienteId: string | null = null;
  turnos: Turno[] = [];

  // Configuración de la Mat-Table
  displayedColumns: string[] = ['fecha','especialidad','estado'];
  dataSource = this.turnos;  // ¡podría ser también new MatTableDataSource<Turno>()!

  public turnosChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [['Estado','Cantidad']],
    options: { title: 'Turnos por estado', height: 300 }
  };

  constructor(private turnoSvc: TurnoService) {}

  ngOnInit() {
    this.turnoSvc.getPacientes().subscribe(ps => {
      this.pacientes = ps;
      if (ps.length) this.selectPaciente(ps[0].idPaciente);
    });
  }

  selectPaciente(id: string) {
    this.selectedPacienteId = id;
    this.turnoSvc.getTurnosPorPaciente(id).subscribe(lista => {
      this.turnos = lista;
      this.dataSource = lista;           // actualiza dataSource
      this.actualizarChart(lista);
    });
  }

  private actualizarChart(lista: Turno[]) {
    const contador: Record<string, number> = {};
    lista.forEach(t => contador[t.estado] = (contador[t.estado]||0)+1);
    const data: any[][] = [['Estado','Cantidad']];
    for (const e in contador) data.push([e,contador[e]]);
    this.turnosChart = {
      chartType: 'PieChart',
      dataTable: data,
      options: { title: 'Turnos por estado', height: 300 }
    };
  }
}





// // reporte-visitas-paciente.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   Ng2GoogleChartsModule,
//   GoogleChartInterface
// } from 'ng2-google-charts';
// import { TurnoService } from '../../services/turno.service';
// import { Paciente }   from '../../models/paciente.model';
// import { Turno }      from '../../models/turno.model';

// @Component({
//   standalone: true,
//   selector: 'app-reporte-visitas-paciente',
//   imports: [CommonModule, Ng2GoogleChartsModule],
//   templateUrl: './reporte-visitas-paciente.component.html',
//   styleUrls: ['./reporte-visitas-paciente.component.scss']  // ← aquí, con S y en plural
// })

// export class ReporteVisitasPacienteComponent implements OnInit {
//   pacientes: Paciente[] = [];
//   selectedPacienteId: string | null = null;

//   // El arreglo que alimenta la tabla *ngFor
//   turnos: Turno[] = [];

//   // El wrapper para Google Charts
//   public turnosChart: GoogleChartInterface = {
//     chartType: 'PieChart',
//     dataTable: [['Estado','Cantidad']],
//     options: { title: 'Turnos por estado', height: 300 }
//   };

//   constructor(private turnoSvc: TurnoService) {}

//   ngOnInit() {
//     this.turnoSvc.getPacientes().subscribe(ps => {
//       this.pacientes = ps;
//       if (ps.length) {
//         // auto-selecciono el primero para que se vea algo al cargar
//         this.selectPaciente(ps[0].idPaciente);
//       }
//     });
//   }

//   public selectPaciente(id: string) {
//     this.selectedPacienteId = id;

//     // Traigo DINÁMICAMENTE los turnos de este paciente
//     this.turnoSvc.getTurnosPorPaciente(id).subscribe(lista => {
//       this.turnos = lista;
//       this.actualizarChart(lista);
//     });
//   }

//   private actualizarChart(lista: Turno[]) {
//     // 1) Contar por estado
//     const contador: Record<string, number> = {};
//     for (const t of lista) {
//       contador[t.estado] = (contador[t.estado] || 0) + 1;
//     }

//     // 2) Construir la dataTable para Google Charts
//     const data: any[][] = [['Estado','Cantidad']];
//     for (const estado in contador) {
//       data.push([estado, contador[estado]]);
//     }

//     // 3) Reasigno TODO el objeto para forzar redraw
//     this.turnosChart = {
//       chartType: 'PieChart',
//       dataTable: data,
//       options: {
//         title: 'Turnos por estado',
//         height: 300
//       }
//     };
//   }
// }






// // src/app/components/reporte-visitas-paciente/reporte-visitas-paciente.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Ng2GoogleChartsModule, GoogleChartInterface } from 'ng2-google-charts';
// import { TurnoService } from '../../services/turno.service';
// import { Paciente }   from '../../models/paciente.model';
// import { Turno }      from '../../models/turno.model';

// @Component({
//   standalone: true,
//   selector: 'app-reporte-visitas-paciente',
//   imports: [CommonModule, Ng2GoogleChartsModule],
//   templateUrl: './reporte-visitas-paciente.component.html',
//   styleUrl: './reporte-visitas-paciente.component.scss'
// })
// export class ReporteVisitasPacienteComponent implements OnInit {
//   pacientes: Paciente[] = [];
//   selectedPacienteId: string | null = null;
//   turnos: Turno[] = [];                         // ← Añadido

//   // Guardamos aquí los datos precalculados
//   private dataByPaciente: Record<string, any[][]> = {};
//   private turnosByPaciente: Record<string, Turno[]> = {};  // ← Añadido

//   public turnosChart: GoogleChartInterface = {
//     chartType: 'PieChart',
//     dataTable: [['Estado','Cantidad']],
//     options: { title: 'Turnos por estado', height: 300 }
//   };

//   constructor(private turnoSvc: TurnoService) {}

//   ngOnInit() {
//     this.turnoSvc.getPacientes().subscribe(ps => {
//       this.pacientes = ps;

//       ps.forEach(p => {
//         this.turnoSvc.getTurnosPorPaciente(p.idPaciente).subscribe(lista => {
//           // Guardamos los turnos completos:
//           this.turnosByPaciente[p.idPaciente] = lista;

//           // Preparamos la tabla del pie:
//           const contador: Record<string, number> = {};
//           lista.forEach(t => contador[t.estado] = (contador[t.estado] || 0) + 1);

//           const table: any[][] = [['Estado','Cantidad']];
//           for (const estado in contador) {
//             table.push([estado, contador[estado]]);
//           }
//           this.dataByPaciente[p.idPaciente] = table;

//           // Auto-selecciono el primero:
//           if (this.selectedPacienteId === null) {
//             this.selectPaciente(p.idPaciente);
//           }
//         });
//       });
//     });
//   }

//   public selectPaciente(id: string) {
//     this.selectedPacienteId = id;

//     // Recupero y asigno la lista de turnos
//     this.turnos = this.turnosByPaciente[id] || [];

//     // Recupero y reasigno el chart con la tabla precalculada
//     const table = this.dataByPaciente[id] || [['Estado','Cantidad']];
//     this.turnosChart = {
//       chartType: 'PieChart',
//       dataTable: table,
//       options: {
//         title: 'Turnos por estado',
//         height: 300
//       }
//     };
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Ng2GoogleChartsModule, GoogleChartInterface } from 'ng2-google-charts';
// import { TurnoService } from '../../services/turno.service';
// import { Paciente }   from '../../models/paciente.model';
// import { Turno }      from '../../models/turno.model';

// @Component({
//   standalone: true,
//   selector: 'app-reporte-visitas-paciente',
//   imports: [CommonModule, Ng2GoogleChartsModule],
//   templateUrl: './reporte-visitas-paciente.component.html',
//   styleUrl: './reporte-visitas-paciente.component.scss'
// })
// export class ReporteVisitasPacienteComponent implements OnInit {
//   pacientes: Paciente[] = [];
//   selectedPacienteId: string | null = null;
//   turnos: Turno[] = [];

//   public turnosChart: GoogleChartInterface = {
//     chartType: 'PieChart',
//     dataTable: [['Estado','Cantidad']],  // cabecera inicial
//     options: { title: 'Turnos por estado', height: 300 }
//   };

//   constructor(private turnoSvc: TurnoService) {}

//   ngOnInit() {
//     this.turnoSvc.getPacientes().subscribe(ps => {
//       this.pacientes = ps;

//       // auto-selecciono el primero para que no esté vacío al iniciar
//       if (ps.length) {
//         this.selectPaciente(ps[0].idPaciente);
//       }
//     });
//   }

//   public selectPaciente(id: string) {
//     this.selectedPacienteId = id;
//     this.turnoSvc.getTurnosPorPaciente(id).subscribe(lista => {
//       this.turnos = lista;
//       this.actualizarChart(lista);
//     });
//   }

//   private actualizarChart(lista: Turno[]) {
//     // 1) Cuento por estado
//     const contador: Record<string, number> = {};
//     for (const t of lista) {
//       contador[t.estado] = (contador[t.estado] || 0) + 1;
//     }

//     // 2) Preparo la tabla (header + filas)
//     const data: any[][] = [['Estado','Cantidad']];
//     for (const estado in contador) {
//       data.push([estado, contador[estado]]);
//     }

//     // 3) Reasigno el objeto completo para forzar redraw
//     this.turnosChart = {
//       chartType: 'PieChart',
//       dataTable: data,
//       options: {
//         title: 'Turnos por estado',
//         height: 300
//       }
//     };
//   }
// }


// // reporte-visitas-paciente.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Ng2GoogleChartsModule, GoogleChartInterface } from 'ng2-google-charts';
// import { Turno } from '../../models/turno.model';
// import { Paciente } from '../../models/paciente.model';
// import { TurnoService } from '../../services/turno.service';

// @Component({
//   standalone: true,
//   selector: 'app-reporte-visitas-paciente',
//   imports: [CommonModule, Ng2GoogleChartsModule],
//   templateUrl: './reporte-visitas-paciente.component.html',
//   styleUrl: './reporte-visitas-paciente.component.scss'
// })

// export class ReporteVisitasPacienteComponent implements OnInit {
//   pacientes: Paciente[] = [];
//   selectedPacienteId: string | null = null;
//   turnos: Turno[] = [];

//   public turnosChart: GoogleChartInterface = {
//     chartType: 'PieChart',
//     // Ahora lo tipamos como any[][]
//     dataTable: [] as any[][],
//     options: { title: 'Turnos por estado', height: 300 }
//   };

//   constructor(private turnoSvc: TurnoService) { }

//   ngOnInit() {
//     this.turnoSvc.getPacientes().subscribe(ps => {
//       this.pacientes = ps;
//       if (ps.length) {
//         this.selectPaciente(ps[0].idPaciente);
//       }
//     });
//   }

//   // reporte-visitas-paciente.component.ts
//   public selectPaciente(id: string) {
//     this.selectedPacienteId = id;                   // ← guardo el id seleccionado
//     this.turnoSvc.getTurnosPorPaciente(id)
//       .subscribe(lista => {
//         this.turnos = lista;
//         this.actualizarChart(lista);
//       });
//   }

//   private actualizarChart(lista: Turno[]) {
//     const contador: Record<string, number> = {};
//     for (const t of lista) {
//       contador[t.estado] = (contador[t.estado] || 0) + 1;
//     }

//     const data: any[][] = [['Estado', 'Cantidad']];
//     for (const estado in contador) {
//       data.push([estado, contador[estado]]);
//     }

//     this.turnosChart = {
//       chartType: 'PieChart',
//       dataTable: data,        // ← nuevo dataTable completa
//       options: {
//         title: 'Turnos por estado',
//         height: 300
//       }
//     };
//   }

// }

