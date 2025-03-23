import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro-paciente.component.html',
  styleUrl: './registro-paciente.component.css'
})

export class RegistroPacienteComponent implements OnInit {
  registroForm!: FormGroup;
  imagenPrevia1: string | ArrayBuffer | null = null;
  imagenPrevia2: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(0)]],
      dni: ['', Validators.required],
      obraSocial: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      imagenPerfil1: [null, Validators.required],
      imagenPerfil2: [null, Validators.required]
    });
  }

  onFileChange(event: any, imagen: number): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      if (imagen === 1) {
        this.registroForm.patchValue({ imagenPerfil1: file });
      } else if (imagen === 2) {
        this.registroForm.patchValue({ imagenPerfil2: file });
      }
      // Leer archivo para previsualización
      const reader = new FileReader();
      // reader.onload = (e) => {
      //   if (imagen === 1) {
      //     this.imagenPrevia1 = e.target?.result;
      //   } else if (imagen === 2) {
      //     this.imagenPrevia2 = e.target?.result;
      //   }
      // };

      reader.onload = (e) => {
        if (imagen === 1) {
          this.imagenPrevia1 = e.target?.result ?? null;
        } else if (imagen === 2) {
          this.imagenPrevia2 = e.target?.result ?? null;
        }
      };
      


      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const pacienteData = this.registroForm.value;
      console.log('Datos de registro del paciente:', pacienteData);
      // Integra aquí el servicio de registro (por ejemplo, utilizando Firebase)
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}