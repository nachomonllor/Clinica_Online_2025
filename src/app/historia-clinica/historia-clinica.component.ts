import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoriaClinica } from '../models/historia-clinica.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './historia-clinica.component.html',
  styleUrl: './historia-clinica.component.css'
})

export class HistoriaClinicaComponent implements OnInit {
  historiaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.historiaForm = this.fb.group({
      altura: [null, [Validators.required, Validators.min(0)]],
      peso: [null, [Validators.required, Validators.min(0)]],
      temperatura: [null, [Validators.required, Validators.min(0)]],
      presion: ['', Validators.required],
      datosDinamicos: this.fb.array([]) // Inicialmente sin datos dinámicos.
    });
  }

  ngOnInit(): void {}

  // Getter para simplificar el acceso al FormArray de datos dinámicos.
  get datosDinamicos(): FormArray {
    return this.historiaForm.get('datosDinamicos') as FormArray;
  }

  // Agrega un nuevo grupo para un dato dinámico, si aún no se alcanzó el máximo.
  addDatoDinamico(): void {
    if (this.datosDinamicos.length < 3) {
      const datoGroup = this.fb.group({
        clave: ['', Validators.required],
        valor: ['', Validators.required]
      });
      this.datosDinamicos.push(datoGroup);
    } else {
      alert('Solo se permiten hasta 3 datos dinámicos.');
    }
  }

  // Elimina el dato dinámico en la posición indicada.
  removeDatoDinamico(index: number): void {
    this.datosDinamicos.removeAt(index);
  }

  // Envía la historia clínica.
  onSubmit(): void {
    if (this.historiaForm.valid) {
      const historia: HistoriaClinica = this.historiaForm.value;
      console.log('Historia clínica enviada:', historia);
      // Aquí integras el envío al backend (por ejemplo, con Firebase o una API REST).
    } else {
      this.historiaForm.markAllAsTouched();
    }
  }
}

