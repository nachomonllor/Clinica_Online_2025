import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Paciente } from '../../models/paciente.model';
import { FirestoreService } from '../../services/firestore.service';
  
@Component({
    selector: 'app-listar-pacientes',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    templateUrl: './listar-pacientes.component.html',
    styleUrls: ['./listar-pacientes.component.scss']
})
export class ListarPacientesComponent implements OnInit {
  pacientes: Paciente[] = [];
  displayedColumns: string[] = ['avatar', 'nombre', 'apellido', 'email', 'obraSocial'];

  constructor(private fsService: FirestoreService) {}

  ngOnInit() {
    this.fsService.getPacientes().subscribe((data: Paciente[]) => {
      this.pacientes = data;
    });
  }
}



// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-listar-pacientes',
//   standalone: true,
//   imports: [],
//   templateUrl: './listar-pacientes.component.html',
//   styleUrl: './listar-pacientes.component.scss'
// })
// export class ListarPacientesComponent {

// }
