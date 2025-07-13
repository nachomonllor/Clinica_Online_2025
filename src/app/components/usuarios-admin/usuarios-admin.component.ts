
// src/app/components/usuarios-admin/usuarios-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule }           from '@angular/material/table';
import { MatCardModule }            from '@angular/material/card';
import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatInputModule }           from '@angular/material/input';
import { MatButtonModule }          from '@angular/material/button';
import { MatIconModule }            from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource }       from '@angular/material/table';

import { UsuarioService }           from '../../services/usuario.service';
import { Usuario }                  from '../../models/usuario.model';

import { AnyUser } from '../../models/any-user.model';
import { UsuarioRow } from '../../models/usuario-row.model';
 
@Component({
  standalone: true,
  selector: 'app-usuarios-admin',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']  // asegúrate de que este archivo existe
})
export class UsuariosAdminComponent implements OnInit {
  //usuarios: Usuario[] = [];

  usuarios: AnyUser[] = [];

  //dataSource = new MatTableDataSource<AnyUser>([]);

  displayedColumns = ['perfil','nombre','apellido','email','activo','acciones'];
  //dataSource = new MatTableDataSource<Usuario>([]);

    //  displayedColumns = ['perfil','nombre','apellido','email','activo','acciones'];
  dataSource = new MatTableDataSource<UsuarioRow>([]);

  usuarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioSvc: UsuarioService,
    private dialog: MatDialog
  ) {
    this.usuarioForm = this.fb.group({
      perfil:       ['Paciente', Validators.required],
      nombre:       ['', Validators.required],
      apellido:     ['', Validators.required],
      email:        ['', [Validators.required, Validators.email]],
      imagenPerfil: [null],
      // campos opcionales
      horarios:     [[]],
      activo:       [false]
    });
  }

  // ngOnInit(): void {
  //   this.usuarioSvc.getUsuarios()
  //     .subscribe(us => {
  //       this.usuarios = us;
  //       this.dataSource.data = us;
  //     });
  // }

  ngOnInit() {
    this.usuarioSvc.getUsuarios().subscribe(list => {
      this.dataSource.data = list;
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) return;
    const u: Usuario = this.usuarioForm.value;
    this.usuarioSvc.crearUsuario(u).subscribe(() => {
      this.usuarioForm.reset({ perfil: 'Paciente', activo: false, horarios: [] });
    });
  }

  toggleActivo(u: Usuario): void {
    if (u.perfil === 'Especialista' && u.id) {
      this.usuarioSvc.toggleActivo(u.id).subscribe();
    }
  }
}




// // src/app/components/usuarios-admin/usuarios-admin.component.ts

// import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
// import * as XLSX from 'xlsx';

// // Angular Material

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatTableDataSource }     from '@angular/material/table';
// import { UsuarioService }         from '../../services/usuario.service';
// import { Usuario } from '../../models/usuario.model';


// @Component({
//   selector: 'app-usuarios-admin',
//   standalone: true,
//   imports: [ /* ...módulos Material y ReactiveFormsModule */ ],
//   templateUrl: './usuarios-admin.component.html',
//   styleUrls: ['./usuarios-admin.component.scss']
// })
// export class UsuariosAdminComponent implements OnInit {
//   usuarios: Usuario[] = [];
//   displayedColumns = ['id','perfil','nombre','apellido','email','acciones'];
//   dataSource = new MatTableDataSource<Usuario>([]);
//   usuarioForm: FormGroup;
//   imagenPreview: string | ArrayBuffer | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private usuarioSvc: UsuarioService       // ← inyectamos el servicio
//   ) {
//     this.usuarioForm = this.fb.group({
//       perfil:       ['Paciente', Validators.required],
//       nombre:       ['', Validators.required],
//       apellido:     ['', Validators.required],
//       edad:         [null, [Validators.required, Validators.min(0)]],
//       dni:          ['', Validators.required],
//       email:        ['', [Validators.required, Validators.email]],
//       password:     ['', Validators.required],
//       obraSocial:   [''],
//       especialidad: [''],
//       imagenPerfil: [null]
//     });
//   }

//   // ngOnInit(): void {
//   //   // 1) Suscribirse al stream de usuarios
//   //   this.usuarioSvc.getUsuarios()
//   //     .subscribe(us => {
//   //       this.usuarios = us;
//   //       this.dataSource.data = us;
//   //     });
//   // }

//   ngOnInit() {
//     this.usuarioSvc.getUsuarios()
//       .subscribe(list => this.dataSource.data = list);
//   }

//   onFileChange(event: any): void { /* igual que antes */ }

//   /** Al enviar, delegamos al servicio */
//   onSubmit(): void {
//     if (this.usuarioForm.invalid) return;
//     const val = this.usuarioForm.value as Partial<Usuario>;
//     // Sólo campos válidos
//     const nuevo: Usuario = {
//       perfil:       val.perfil!,
//       nombre:       val.nombre!,
//       apellido:     val.apellido!,
//       edad:         val.edad!,
//       dni:          val.dni!,
//       email:        val.email!,
//       password:     val.password!,
//       obraSocial:   val.perfil === 'Paciente'     ? val.obraSocial! : undefined,
//       especialidad: val.perfil === 'Especialista' ? val.especialidad! : undefined,
//       activo:       val.perfil === 'Especialista' ? true : undefined,
//       imagenPerfil: this.imagenPreview as string
//     };
//     this.usuarioSvc.crearUsuario(nuevo).subscribe(() => {
//       this.usuarioForm.reset({ perfil: 'Paciente' });
//       this.imagenPreview = null;
//     });
//   }

//   /** Llamamos al servicio para alternar el flag `activo` */
//   toggleActivo(u: Usuario) {
//     if (u.perfil === 'Especialista') {
//       this.usuarioSvc.toggleActivo(u.id!).subscribe();
//     }
//   }

//     descargarExcel(): void {
//     // 1) Prepara un array sólo con los campos que quieres exportar
//     const exportData = this.usuarios.map(u => ({
//       id: u.id,
//       perfil: u.perfil,
//       nombre: u.nombre,
//       apellido: u.apellido,
//       edad: u.edad,
//       dni: u.dni,
//       email: u.email,
//       obraSocial: u.obraSocial || '',
//       especialidad: u.especialidad || '',
//       activo: u.activo != null ? u.activo : ''
//     }));

//     // 2) Crea la hoja y el workbook
//     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook: XLSX.WorkBook = {
//       Sheets: { 'Usuarios': worksheet },
//       SheetNames: ['Usuarios']
//     };

//     // 3) Descarga
//     XLSX.writeFile(workbook, 'usuarios.xlsx');
//   }



// }






// // import { CommonModule } from '@angular/common';
// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// // import * as XLSX from 'xlsx';

// // // Angular Material
// // import { MatTableModule } from '@angular/material/table';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MatInputModule } from '@angular/material/input';
// // import { MatSelectModule } from '@angular/material/select';
// // import { MatButtonModule } from '@angular/material/button';
// // import { MatIconModule } from '@angular/material/icon';
// // import { MatTableDataSource } from '@angular/material/table';

// // export type Perfil = 'Paciente' | 'Especialista' | 'Administrador';

// // export interface Usuario {
// //   id?: number;
// //   perfil: Perfil;
// //   nombre: string;
// //   apellido: string;
// //   edad: number;
// //   dni: string;
// //   email: string;
// //   password: string;
// //   // Campos opcionales según perfil
// //   obraSocial?: string;           // Paciente
// //   imagenPerfil1?: string;        // Paciente
// //   imagenPerfil2?: string;        // Paciente
// //   especialidad?: string;         // Especialista
// //   imagenPerfil?: string;         // Especialista y Administrador
// //   activo?: boolean;              // Para Especialistas
// // }

// // @Component({
// //   selector: 'app-usuarios-admin',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     FormsModule,
// //     ReactiveFormsModule,
// //     // Material
// //     MatTableModule,
// //     MatFormFieldModule,
// //     MatInputModule,
// //     MatSelectModule,
// //     MatButtonModule,
// //     MatIconModule
// //   ],
// //   templateUrl: './usuarios-admin.component.html',
// //   styleUrls: ['./usuarios-admin.component.css']
// // })
// // export class UsuariosAdminComponent implements OnInit {
// //   usuarios: Usuario[] = [];
// //   displayedColumns: string[] = ['id', 'perfil', 'nombre', 'apellido', 'email', 'acciones'];
// //   dataSource = new MatTableDataSource<Usuario>([]);

// //   usuarioForm: FormGroup;
// //   imagenPreview: string | ArrayBuffer | null = null;

// //   constructor(private fb: FormBuilder) {
// //     this.usuarioForm = this.fb.group({
// //       perfil: ['Paciente', Validators.required],
// //       nombre: ['', Validators.required],
// //       apellido: ['', Validators.required],
// //       edad: [null, [Validators.required, Validators.min(0)]],
// //       dni: ['', Validators.required],
// //       email: ['', [Validators.required, Validators.email]],
// //       password: ['', Validators.required],
// //       // Campos condicionales
// //       obraSocial: [''],
// //       especialidad: [''],
// //       imagenPerfil: [null]
// //     });
// //   }

// //   ngOnInit(): void {
// //     // Carga inicial (simulada)
// //     this.usuarios = [
// //       { id: 1, perfil: 'Especialista', nombre: 'Juan', apellido: 'Pérez', edad: 35, dni: '12345678', email: 'juan@clinica.com', password: '******', especialidad: 'Cardiología', activo: true, imagenPerfil: '' },
// //       { id: 2, perfil: 'Administrador', nombre: 'Ana', apellido: 'Gómez', edad: 40, dni: '87654321', email: 'ana@clinica.com', password: '******', activo: true, imagenPerfil: '' }
// //     ];
// //     this.dataSource.data = this.usuarios;
// //   }

// //   onFileChange(event: any): void {
// //     if (event.target.files && event.target.files.length) {
// //       const file = event.target.files[0];
// //       this.usuarioForm.patchValue({ imagenPerfil: file });
// //       const reader = new FileReader();
// //       reader.onload = (e: any) => {
// //         this.imagenPreview = e.target.result;
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   }

// //   onSubmit(): void {
// //     if (this.usuarioForm.invalid) return;

// //     const val = this.usuarioForm.value;
// //     const nuevo: Usuario = {
// //       id: this.usuarios.length + 1,
// //       perfil: val.perfil,
// //       nombre: val.nombre,
// //       apellido: val.apellido,
// //       edad: val.edad,
// //       dni: val.dni,
// //       email: val.email,
// //       password: val.password,
// //       obraSocial: val.perfil === 'Paciente' ? val.obraSocial : undefined,
// //       especialidad: val.perfil === 'Especialista' ? val.especialidad : undefined,
// //       activo: val.perfil === 'Especialista' ? true : undefined,
// //       imagenPerfil: this.imagenPreview as string
// //     };

// //     this.usuarios.push(nuevo);
// //     this.dataSource.data = this.usuarios;
// //     this.usuarioForm.reset({ perfil: 'Paciente' });
// //     this.imagenPreview = null;
// //   }

// //   toggleActivo(usuario: Usuario): void {
// //     if (usuario.perfil === 'Especialista') {
// //       usuario.activo = !usuario.activo;
// //     }
// //   }

// //   // descargarExcel(): void {
// //   //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.usuarios);
// //   //   const workbook: XLSX.WorkBook = { Sheets: { 'Usuarios': worksheet }, SheetNames: ['Usuarios'] };
// //   //   XLSX.writeFile(workbook, 'usuarios.xlsx');
// //   // }

// //   descargarExcel(): void {
// //     // 1) Prepara un array sólo con los campos que quieres exportar
// //     const exportData = this.usuarios.map(u => ({
// //       id: u.id,
// //       perfil: u.perfil,
// //       nombre: u.nombre,
// //       apellido: u.apellido,
// //       edad: u.edad,
// //       dni: u.dni,
// //       email: u.email,
// //       obraSocial: u.obraSocial || '',
// //       especialidad: u.especialidad || '',
// //       activo: u.activo != null ? u.activo : ''
// //     }));

// //     // 2) Crea la hoja y el workbook
// //     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
// //     const workbook: XLSX.WorkBook = {
// //       Sheets: { 'Usuarios': worksheet },
// //       SheetNames: ['Usuarios']
// //     };

// //     // 3) Descarga
// //     XLSX.writeFile(workbook, 'usuarios.xlsx');
// //   }


// // }
