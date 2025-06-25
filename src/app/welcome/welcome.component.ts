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

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }
}
