
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

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Horario {
  especialidad: string;  // seguiremos guardando como string (comma-joined)
  dias: string[];
  horas: string[];
}

// interface Usuario {
//   nombre: string;
//   apellido: string;
//   email: string;
//   imagenPerfil?: string;
//   horarios: Horario[];
// }

interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  imagenPerfil?: string;
  horarios: Horario[];

  /** NUEVO  ▸ te sugiero tiparlo como unión literal */
  rol: 'paciente' | 'especialista' | 'administrador';
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

  especialidades = ['Cardiología', 'Dermatología', 'Neurología', 'Pediatría', 'Psiquiatría'];
  diasDisponibles = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  horasDisponibles = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  horarioForm: FormGroup;

  // usuario: Usuario = {
  //   nombre: 'Guido',
  //   apellido: 'Kafka',
  //   email: 'guido.kafka@ejemplo.com',
  //   imagenPerfil: 'assets/avatar.JPG',
  //   horarios: []
  // };

  usuario: Usuario = {
    nombre: 'Guido',
    apellido: 'Kafka',
    email: 'guido.kafka@ejemplo.com',
    imagenPerfil: 'assets/avatar.JPG',
    horarios: [],
    rol: 'paciente'          // ← ¡nuevo!
  };

  constructor(private fb: FormBuilder) {
    this.horarioForm = this.fb.group({
      especialidades: [<string[]>[], Validators.required],
      dias: [<string[]>[], Validators.required],
      horas: [<string[]>[], Validators.required]
    });
  }

  ngOnInit(): void { }

  /*
   PARA FIREBASE
    constructor(
      private fb: FormBuilder,
      private authSvc: AuthService          // ← inyectamos el servicio
    ) {
    }

    ngOnInit(): void {
      this.authSvc.obtenerPerfil()          // llamada al backend
        .subscribe(perfil => this.usuario = perfil);  // actualizamos el modelo
    }
  */


  private toggleItem(controlName: 'especialidades' | 'dias' | 'horas', value: string) {
    const ctrl = this.horarioForm.get(controlName)!;
    const arr: string[] = ctrl.value || [];
    const updated = arr.includes(value)
      ? arr.filter(x => x !== value)
      : [...arr, value];
    ctrl.setValue(updated);
  }

  toggleEspecialidad(esp: string) { this.toggleItem('especialidades', esp); }
  toggleDia(d: string) { this.toggleItem('dias', d); }
  toggleHora(h: string) { this.toggleItem('horas', h); }

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


  // Ejemplo estático: en un proyecto real vendrá de tu API
  historiaClinica = [
    { fecha: '2024-05-03', especialista: 'Dr. Gómez', motivo: 'Controles', notas: 'Sin hallazgos' },
    { fecha: '2024-06-21', especialista: 'Dra. Ruiz', motivo: 'Dermatitis', notas: 'Se indicó crema' },
    { fecha: '2025-06-21', especialista: 'Dra. Florencia De Cesare', motivo: 'Hiperglucemia', notas: 'Receta metformina' },
    { fecha: '2025-06-21', especialista: 'Dra. Nora Da Puente', motivo: 'Hipertension', notas: 'Se receto Nebivolol de 5 miligramos' },
    { fecha: '2025-06-21', especialista: 'Dra. Nora Da Puente', motivo: 'Hipertension', notas: 'Se receto Alpertan 160' },

    { fecha: '2025-06-21', especialista: 'Dr. Francisco Martinez', motivo: 'Rectificacion cervical', notas: 'Se receto kinesiologia' },

  ];

  /* ----- NUEVO MÉTODO ----- */
  // descargarPDF(): void {

  //   const doc = new jsPDF();
  //   const logo = new Image();
  //   logo.src = 'assets/logo-clinica.JPG';    // usa tu ruta real

  //   Encabezado
  //   doc.addImage(logo, 'PNG', 10, 10, 30, 30);          // Logo
  //   doc.setFontSize(18);
  //   doc.text('Historia Clínica', 105, 20, { align: 'center' }); // Título
  //   doc.setFontSize(11);
  //   doc.text(`Emitido: ${new Date().toLocaleDateString()}`, 105, 28, { align: 'center' });

  //   Tabla 
  //   autoTable(doc, {
  //     startY: 45,
  //     head: [['Fecha', 'Especialista', 'Motivo', 'Notas']],
  //     body: this.historiaClinica.map(r => [r.fecha, r.especialista, r.motivo, r.notas]),
  //     styles: { fontSize: 10 }
  //   });

  //   Descargar 
  //   doc.save('historia_clinica.pdf');
  // }


  descargarPDF(): void {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = 'assets/logo-clinica.png';      // ① ruta válida

    // ② si carga bien, dibuja todo y descarga
    logo.onload = () => {
      // Encabezado con logo
      doc.addImage(logo, 'PNG', 10, 10, 30, 30);
      doc.setFontSize(18);
      doc.text('Historia Clínica', 105, 20, { align: 'center' });
      doc.setFontSize(11);
      doc.text(`Emitido: ${new Date().toLocaleDateString()}`, 105, 28, { align: 'center' });

      // Tabla
      autoTable(doc, {
        startY: 45,
        head: [['Fecha', 'Especialista', 'Motivo', 'Notas']],
        body: this.historiaClinica.map(r => [r.fecha, r.especialista, r.motivo, r.notas]),
        styles: { fontSize: 10 }
      });

      // Descargar
      doc.save('historia_clinica.pdf');
    };

    // ③ fallback si no encuentra la imagen
    logo.onerror = () => {
      console.warn('No se encontró el logo, generando PDF sin encabezado gráfico');
      doc.setFontSize(18);
      doc.text('Historia Clínica', 105, 20, { align: 'center' });
      // …mismo flujo de tabla y save()…
      autoTable(doc, {
        startY: 30,
        head: [['Fecha', 'Especialista', 'Motivo', 'Notas']],
        body: this.historiaClinica.map(r => [r.fecha, r.especialista, r.motivo, r.notas]),
        styles: { fontSize: 10 }
      });
      doc.save('historia_clinica.pdf');
    };
  }


}

