import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}



// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { LogTableComponent } from './log-table/log-table.component';
// import { TurnosEspecialidadComponent } from './turnos-especialidad/turnos-especialidad.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     CommonModule,
//     LogTableComponent,
//     TurnosEspecialidadComponent
//   ],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'clinica-online-2025';
// }