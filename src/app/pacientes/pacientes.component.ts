

// src/app/pacientes/pacientes.component.ts
import { Component, OnInit } from '@angular/core';
import { Paciente  } from '../models/paciente.model';
import { HistoriaClinica } from '../models/historia-clinica.model';
import { Turno } from '../models/turno.model';
import { PacienteService } from '../paciente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, 
        FormsModule, 
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,

        BrowserAnimationsModule,  // sin esto Material puede fallar
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
  ],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.scss'
})

export class PacientesComponent implements OnInit {
  pacientes: Paciente[] = [];
  pacienteSeleccionado?: Paciente;
  turnos: Turno[] = [];
  historia?: HistoriaClinica;

  especialistaId!: string;

  constructor(
    private auth: AuthService,
    private svc: PacienteService
  ) {}

  ngOnInit(): void {
    // 1) Obtengo el ID del especialista

    // this.especialistaId = this.auth.user$.uid;
    // 2) Cargo la lista de pacientes
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.svc.getPacientesAtendidos(this.especialistaId)
      .subscribe({
        next: list => this.pacientes = list,
        error: err => console.error('Error al cargar pacientes', err)
      });
  }

  seleccionarPaciente(p: Paciente) {
    this.pacienteSeleccionado = p;
    this.svc.getTurnosDePaciente(p.id, this.especialistaId)
      .subscribe(t => this.turnos = t);
    this.svc.getHistoriaClinica(p.id)
      .subscribe(h => this.historia = h);
  }

  verResena(turno: Turno) {
    // navega o muestra modal de reseña
  }
}


// export class PacientesComponent implements OnInit {
//   pacientes: Paciente[] = [];
//   pacienteSeleccionado?: Paciente;
//   turnos: Turno[] = [];
//   historia?: HistoriaClinica;

//   especialistaId = 'ID_DEL_ESPECIALISTA_ACTUAL'; // obténlo de tu auth

//   //constructor(private svc: PacienteService) {}

//   constructor(private auth: AuthService, private svc: PacienteService) {}

//   ngOnInit() {
//     this.especialistaId = this.auth.currentUser?.uid ?? '';
//     this.cargarPacientes();
//   }


//   // ngOnInit(): void {
//   //   this.svc.getPacientesAtendidos(this.especialistaId)
//   //     .subscribe(list => this.pacientes = list);
//   // }

//   seleccionarPaciente(p: Paciente) {
//     this.pacienteSeleccionado = p;
//     // traigo turnos e historia en paralelo
//     this.svc.getTurnosDePaciente(p.id, this.especialistaId)
//       .subscribe(t => this.turnos = t);
//     this.svc.getHistoriaClinica(p.id)
//       .subscribe(h => this.historia = h);
//   }

//   verResena(turno: Turno) {
//     // navegación o modal a /resenas/:turno.reseñaId
//   }

// }


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-pacientes',
//   standalone: true,
//   imports: [],
//   templateUrl: './pacientes.component.html',
//   styleUrl: './pacientes.component.scss'
// })
// export class PacientesComponent {

// }
