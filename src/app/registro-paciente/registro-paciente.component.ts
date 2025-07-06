import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';
import { FirestoreService } from '../firestore.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-registro-paciente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {
  imagenPrevia1: string | null = null;
  imagenPrevia2: string | null = null;

  registroPacienteForm!: FormGroup<{
    nombre: FormControl<string | null>;
    apellido: FormControl<string | null>;
    edad: FormControl<number | null>;
    dni: FormControl<string | null>;
    obraSocial: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    imagenPerfil1: FormControl<File | null>;
    imagenPerfil2: FormControl<File | null>;
  }>;

  constructor(
    private fb: FormBuilder,
    private fsService: FirestoreService,
    private storage: Storage
  ) {}

  ngOnInit(): void {
    this.registroPacienteForm = this.fb.group({
      nombre: this.fb.control<string | null>(null, Validators.required),
      apellido: this.fb.control<string | null>(null, Validators.required),
      edad: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
      dni: this.fb.control<string | null>(null, Validators.required),
      obraSocial: this.fb.control<string | null>(null, Validators.required),
      email: this.fb.control<string | null>(null, [Validators.required, Validators.email]),
      password: this.fb.control<string | null>(null, Validators.required),
      imagenPerfil1: this.fb.control<File | null>(null, Validators.required),
      imagenPerfil2: this.fb.control<File | null>(null, Validators.required),
    });
  }
  
  onFileChange(event: Event, imagenIndex: 1 | 2): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const controlName = imagenIndex === 1 ? 'imagenPerfil1' : 'imagenPerfil2';
    this.registroPacienteForm.get(controlName)?.setValue(file);
    this.registroPacienteForm.get(controlName)?.markAsDirty();

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (imagenIndex === 1) this.imagenPrevia1 = result;
      else this.imagenPrevia2 = result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.registroPacienteForm.invalid) {
      this.registroPacienteForm.markAllAsTouched();
      return;
    }

    const fv = this.registroPacienteForm.value;
    const file1 = fv.imagenPerfil1!;
    const file2 = fv.imagenPerfil2!;

    const path1 = `pacientes/${Date.now()}_${file1.name}`;
    const path2 = `pacientes/${Date.now()}_${file2.name}`;
    const ref1 = ref(this.storage, path1);
    const ref2 = ref(this.storage, path2);

    Promise.all([
      uploadBytes(ref1, file1).then(() => getDownloadURL(ref1)),
      uploadBytes(ref2, file2).then(() => getDownloadURL(ref2))
    ])
    .then(([url1, url2]) => {
      const nuevoPaciente = {
        nombre: fv.nombre!,
        apellido: fv.apellido!,
        edad: fv.edad!,
        dni: fv.dni!,
        obraSocial: fv.obraSocial!,
        email: fv.email!,
        password: fv.password!,
        avatarUrl: url1,
        imagenPerfil1: url1,
        imagenPerfil2: url2
      };
      return this.fsService.addPaciente(nuevoPaciente);
    })
    .then(docRef => {
      // Actualizamos solo el campo 'id' en el documento
      return this.fsService.updatePaciente(docRef.id, { id: docRef.id });
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Paciente registrado con éxito',
        showConfirmButton: false,
        timer: 2000
      });
      this.registroPacienteForm.reset();
      this.imagenPrevia1 = this.imagenPrevia2 = null;
    })
    .catch(err => Swal.fire('Error', err.message, 'error'));
  }
}





// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import Swal from 'sweetalert2';
// import { Paciente } from '../models/paciente.model';
// import { FirestoreService } from '../firestore.service';

// import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

// @Component({
//   selector: 'app-registro-paciente',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatCardModule
//   ],
//   templateUrl: './registro-paciente.component.html',
//   styleUrl: './registro-paciente.component.css'
// })

// export class RegistroPacienteComponent implements OnInit {

//   imagenPrevia1: string | null = null;
//   imagenPrevia2: string | null = null;


//   constructor(
//     private fb: FormBuilder,
//     private fsService: FirestoreService,
//     private storage: Storage
//   ) {}
    

//   registroPacienteForm!: FormGroup<{
//     nombre:        FormControl<string | null>;
//     apellido:      FormControl<string | null>;
//     edad:          FormControl<number | null>;
//     dni:           FormControl<string | null>;
//     obraSocial:    FormControl<string | null>;
//     email:         FormControl<string | null>;
//     password:      FormControl<string | null>;
//     imagenPerfil1: FormControl<File | null>;
//     imagenPerfil2: FormControl<File | null>;
//   }>;

//   ngOnInit() {
//     this.registroPacienteForm = this.fb.group({
//       nombre:        this.fb.control<string | null>(null, Validators.required),
//       apellido:      this.fb.control<string | null>(null, Validators.required),
//       edad:          this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
//       dni:           this.fb.control<string | null>(null, Validators.required),
//       obraSocial:    this.fb.control<string | null>(null, Validators.required),
//       email:         this.fb.control<string | null>(null, [Validators.required, Validators.email]),
//       password:      this.fb.control<string | null>(null, Validators.required),
//       imagenPerfil1: this.fb.control<File | null>(null, Validators.required),
//       imagenPerfil2: this.fb.control<File | null>(null, Validators.required),
//     });
//   }
  
//   onFileChange(event: Event, imagenIndex: 1 | 2): void {
//     const input = event.target as HTMLInputElement;
//     if (!input.files?.length) {
//       return;
//     }

//     const file = input.files[0];
//     // Actualizamos el FormControl correspondiente
//     const controlName = imagenIndex === 1 ? 'imagenPerfil1' : 'imagenPerfil2';
//     this.registroPacienteForm.get(controlName)!.setValue(file);
//     this.registroPacienteForm.get(controlName)!.markAsDirty();

//     // Creamos la vista previa
//     const reader = new FileReader();
//     reader.onload = () => {
//       const result = reader.result as string;
//       if (imagenIndex === 1) {
//         this.imagenPrevia1 = result;
//       } else {
//         this.imagenPrevia2 = result;
//       }
//     };
//     reader.readAsDataURL(file);
//   }

//     onSubmit() {
//         const fv = this.registroPacienteForm.value;

//         const file1 = fv.imagenPerfil1!;
//         const file2 = fv.imagenPerfil2!;
//         const path1 = `pacientes/${Date.now()}_${file1.name}`;
//         const path2 = `pacientes/${Date.now()}_${file2.name}`;
//         const ref1 = ref(this.storage, path1);
//         const ref2 = ref(this.storage, path2);

//         // Subo ambas imágenes y obtengo sus URLs
//         Promise.all([
//           uploadBytes(ref1, file1).then(() => getDownloadURL(ref1)),
//           uploadBytes(ref2, file2).then(() => getDownloadURL(ref2))
//         ]).then(([url1, url2]) => {
//           // Armo el objeto sin el campo `id`
//           const nuevoPaciente: Omit<Paciente,'id'> = {
//             nombre:        fv.nombre!,
//             apellido:      fv.apellido!,
//             edad:          fv.edad!,
//             dni:           fv.dni!,
//             obraSocial:    fv.obraSocial!,
//             email:         fv.email!,
//             password:      fv.password!,   // desde el FormControl :contentReference[oaicite:6]{index=6}
//             avatarUrl:     url1,           // elijo la primera como avatar
//             imagenPerfil1: url1,
//             imagenPerfil2: url2
//           };

//           // Lo guardo en Firestore; Firestore generará el id
//           this.fsService.addPaciente(nuevoPaciente)
//             .then(docRef => {
//               // Opcional: guardo el id dentro del propio documento
//               return this.fsService.updatePaciente({...nuevoPaciente, id: docRef.id}, docRef.id);
//             })
//             .then(() => {
//               Swal.fire({ icon: 'success', title: 'Paciente registrado', timer: 2000 });
//               this.registroPacienteForm.reset();
//               this.imagenPrevia1 = this.imagenPrevia2 = null;
//             });
//         });
//       }


// }

