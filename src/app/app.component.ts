import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    // 1) Registra los 3 idiomas disponibles
    this.translate.addLangs(['es','en','pt']);
    // 2) Fija un idioma por defecto (por si detecta uno fuera de estos)
    this.translate.setDefaultLang('es');
    // 3) Usa el idioma del navegador si está en la lista, sino 'es'
    const browserLang = this.translate.getBrowserLang() ?? 'es';
    this.translate.use(['es','en','pt'].includes(browserLang)
      ? browserLang
      : 'es'
    );
  }

}



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