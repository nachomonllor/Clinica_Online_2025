import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatGridListModule }  from '@angular/material/grid-list';

@Component({
  selector: 'app-home-clinica',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule
  ],
  templateUrl: './home-clinica.component.html',
  styleUrl: './home-clinica.component.scss'
})
export class HomeClinicaComponent {

}
