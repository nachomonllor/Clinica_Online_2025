
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

interface Horario {
  especialidad: string;  // seguiremos guardando como string (comma-joined)
  dias: string[];
  horas: string[];
}

interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  imagenPerfil?: string;
  horarios: Horario[];
}

@Component({
    selector: 'app-mi-perfil',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatDividerModule
    ],
    templateUrl: './mi-perfil.component.html',
    styleUrls: ['./mi-perfil.component.css']
})

export class MiPerfilComponent implements OnInit {

  especialidades = ['Cardiología','Dermatología','Neurología','Pediatría','Psiquiatría'];
  diasDisponibles = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
  horasDisponibles = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];

  horarioForm: FormGroup;
     
  usuario: Usuario = {
    nombre: 'Guido',
    apellido: 'Kafka',
    email: 'guido.kafka@ejemplo.com',
    imagenPerfil: 'assets/avatar.JPG',
    horarios: []
  };

   constructor(private fb: FormBuilder) {
      this. horarioForm = this.fb.group({
      especialidades: [<string[]>[], Validators.required],
      dias: [<string[]>[], Validators.required],
      horas: [<string[]>[], Validators.required]
    });
   }

   ngOnInit(): void {}

  private toggleItem(controlName: 'especialidades'|'dias'|'horas', value: string) {
    const ctrl = this.horarioForm.get(controlName)!;
    const arr: string[] = ctrl.value || [];
    const updated = arr.includes(value)
      ? arr.filter(x => x !== value)
      : [...arr, value];
    ctrl.setValue(updated);
  }

  toggleEspecialidad(esp: string) { this.toggleItem('especialidades', esp); }
  toggleDia(d: string)         { this.toggleItem('dias', d); }
  toggleHora(h: string)        { this.toggleItem('horas', h); }

  agregarHorario(): void {
    const { especialidades, dias, horas } = this.horarioForm.value;
    const nuevo: Horario = {
      especialidad: especialidades.join(', '),
      dias,
      horas
    };
    this.usuario.horarios.push(nuevo);
    this.horarioForm.reset({ especialidades: [], dias: [], horas: [] });
  }

}

