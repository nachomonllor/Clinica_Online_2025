import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

export type Perfil = 'Paciente' | 'Especialista' | 'Administrador';

export interface Usuario {
  id?: number;
  perfil: Perfil;
  nombre: string;
  apellido: string;
  edad: number;
  dni: string;
  email: string;
  password: string;
  // Campos opcionales según perfil
  obraSocial?: string;           // Paciente
  imagenPerfil1?: string;        // Paciente (podrías usar dos imágenes en su registro, pero aquí simplificamos)
  imagenPerfil2?: string;        // Paciente
  especialidad?: string;         // Especialista
  imagenPerfil?: string;         // Especialista y Administrador
  activo?: boolean;              // Para Especialistas: indica si tienen acceso al sistema
}

@Component({
  selector: 'app-usuarios-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuarios-admin.component.html',
  styleUrl: './usuarios-admin.component.css'
})
export class UsuariosAdminComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioForm: FormGroup;
  imagenPreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    // Formulario de creación de usuario. Se incluye un select para elegir el perfil.
    this.usuarioForm = this.fb.group({
      perfil: ['Paciente', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(0)]],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      // Campos adicionales condicionales
      obraSocial: [''],
      especialidad: [''],
      imagenPerfil: [null]
    });
  }

  ngOnInit(): void {
    // Carga simulada de usuarios. En un caso real se recuperaría desde un servicio.
    this.usuarios = [
      { id: 1, perfil: 'Especialista', nombre: 'Juan', apellido: 'Pérez', edad: 35, dni: '12345678', email: 'juan@clinica.com', password: '******', especialidad: 'Cardiología', activo: true, imagenPerfil: '' },
      { id: 2, perfil: 'Administrador', nombre: 'Ana', apellido: 'Gómez', edad: 40, dni: '87654321', email: 'ana@clinica.com', password: '******', imagenPerfil: '' }
    ];
  }

  // Maneja la carga de la imagen para Especialista o Administrador
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.usuarioForm.patchValue({ imagenPerfil: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenPreview = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
    }
  }

  // Crea un nuevo usuario con los datos del formulario
  onSubmit(): void {
    if (this.usuarioForm.valid) {
      const nuevoUsuario: Usuario = this.usuarioForm.value;
      // Para Especialista, asigna por defecto acceso activo
      if (nuevoUsuario.perfil === 'Especialista') {
        nuevoUsuario.activo = true;
      }
      // Simulación de asignación de ID
      nuevoUsuario.id = this.usuarios.length + 1;
      this.usuarios.push(nuevoUsuario);
      console.log('Nuevo usuario creado:', nuevoUsuario);
      this.usuarioForm.reset({ perfil: 'Paciente' });
      this.imagenPreview = null;
    } else {
      this.usuarioForm.markAllAsTouched();
    }
  }

  // Alterna el estado de acceso para un Especialista
  toggleActivo(usuario: Usuario): void {
    if (usuario.perfil === 'Especialista') {
      usuario.activo = !usuario.activo;
    }
  }

  descargarExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.usuarios);
    const workbook: XLSX.WorkBook = { Sheets: { 'Usuarios': worksheet }, SheetNames: ['Usuarios'] };
    XLSX.writeFile(workbook, 'usuarios.xlsx');
  }

}
