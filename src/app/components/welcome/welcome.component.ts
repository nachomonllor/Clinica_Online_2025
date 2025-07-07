
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-welcome',
    standalone:true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatCardModule, // ya lo usas en registro-paciente :contentReference[oaicite:0]{index=0}
        MatButtonModule, // idem :contentReference[oaicite:1]{index=1}
        //  BrowserAnimationsModule, // para animaciones y Material
        MatToolbarModule,
        MatIconModule,
        // RouterModule si usas [routerLink], pero en el ejemplo inyectas Router
    ],
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  email = '';
  password = '';

  constructor(public router: Router) {}

  // goToLogin() {
  //   this.router.navigate(['/seleccionar-usuario-login']);
  // }

  // goToRegister() {
  //   this.router.navigate(['/seleccionar-usuario-registro']);
  // }
}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-welcome',
//   standalone: true,
//   imports: [],
//   templateUrl: './welcome.component.html',
//   styleUrl: './welcome.component.css'
// })
// export class WelcomeComponent {

// }
