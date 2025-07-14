
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatCardModule }      from '@angular/material/card';
import { MatSelectModule }    from '@angular/material/select';
import Swal                   from 'sweetalert2';

// Storage y funciones de la API modular:
import { EspecialistaService }                      from '../../services/especialista.service';

// Importamos ngx-translate
import { TranslateService, TranslateModule }         from '@ngx-translate/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-registro-especialista',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    TranslateModule     // ← para usar | translate
    
  ],
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.scss']
})
export class RegistroEspecialistaComponent implements OnInit {
  // Lista de códigos de especialidades
  especialidades = [
    'cardiology',
    'dermatology',
    'gynecology',
    'pediatrics',
    'neurology',
    'other'
  ];

  imagenPrevia: string | null = null;
  loading = false;
  error: string | null = null;

  registroForm!: FormGroup<{
    nombre:           FormControl<string | null>;
    apellido:         FormControl<string | null>;
    edad:             FormControl<number | null>;
    dni:              FormControl<string | null>;
    especialidadNombre: FormControl<string | null>;
    otraEspecialidad: FormControl<string | null>;
    email:            FormControl<string | null>;
    password:         FormControl<string | null>;
    imagenPerfil:     FormControl<File | null>;
  }>;

  constructor(
    // private fb: FormBuilder,
    // private especialistaService: EspecialistaService,
    // private storage: Storage,
    // private translate: TranslateService ,     // ← inyectamos
    // private afStorage: AngularFireStorage

      private fb: FormBuilder,
  private especialistaService: EspecialistaService,
 
  private afStorage: AngularFireStorage,
  private translate: TranslateService

  ) {
    // 1) Registramos idiomas
    this.translate.addLangs(['es','en','pt']);
    // 2) Idioma por defecto
    this.translate.setDefaultLang('es');
  }

  ngOnInit() {
    // 3) Selecciona idioma inicial
    const browserLang = this.translate.getBrowserLang() ?? 'es';
    this.translate.use(['es','en','pt'].includes(browserLang) ? browserLang : 'es');

    this.registroForm = this.fb.group({
      nombre:             this.fb.control<string|null>(null, Validators.required),
      apellido:           this.fb.control<string|null>(null, Validators.required),
      edad:               this.fb.control<number|null>(null, [Validators.required, Validators.min(0)]),
      dni:                this.fb.control<string|null>(null, Validators.required),
      especialidadNombre: this.fb.control<string|null>(null, Validators.required),
      otraEspecialidad:   this.fb.control<string|null>(null),
      email:              this.fb.control<string|null>(null, [Validators.required, Validators.email]),
      password:           this.fb.control<string|null>(null, Validators.required),
      imagenPerfil:       this.fb.control<File|null>(null, Validators.required),
    });

    // Cuando cambie a "other", requerimos el campo extra
    this.registroForm.get('especialidadNombre')!.valueChanges.subscribe(val => {
      const ctrl = this.registroForm.get('otraEspecialidad')!;
      if (val === 'other') {
        ctrl.setValidators([Validators.required]);
      } else {
        ctrl.clearValidators();
        ctrl.setValue(null);
      }
      ctrl.updateValueAndValidity();
    });
  }

  /** Cambiar idioma al vuelo */
  switchLang(lang: string) {
    this.translate.use(lang);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    this.registroForm.get('imagenPerfil')!.setValue(file);
    const reader = new FileReader();
    reader.onload = () => this.imagenPrevia = reader.result as string;
    reader.readAsDataURL(file);
  }

  // async onSubmit() {
  //   if (this.registroForm.invalid) {
  //     this.registroForm.markAllAsTouched();
  //     return;
  //   }
  //   this.loading = true;
  //   this.error   = null;

  //   const fv = this.registroForm.value;
  //   const specialty = fv.especialidadNombre === 'other' 
  //     ? fv.otraEspecialidad! 
  //     : fv.especialidadNombre!;

  //   try {
  //     // sube imagen
  //     const file = fv.imagenPerfil!;
  //     const path = `especialistas/${Date.now()}_${file.name}`;
  //     const storageRef = ref(this.storage, path);
  //     await uploadBytes(storageRef, file);
  //     const url = await getDownloadURL(storageRef);

  //     // crea objeto
  //     const nuevo: any = {
  //       nombre:   fv.nombre!,
  //       apellido: fv.apellido!,
  //       edad:     fv.edad!,
  //       dni:      fv.dni!,
  //       especialidad: specialty,
  //       email:    fv.email!,
  //       password: fv.password!,
  //       imagenPerfil: url
  //     };

  //     // guarda en Firestore
  //     await this.especialistaService.addEspecialista(nuevo);
  //     this.loading = false;
  //     Swal.fire({
  //       icon: 'success',
  //       title: this.translate.instant('REGISTER_SPECIALIST.TITLE'),
  //       timer: 1500,
  //       showConfirmButton: false
  //     });
  //     this.registroForm.reset();
  //     this.imagenPrevia = null;

  //   } catch (err: any) {
  //     this.loading = false;
  //     this.error   = err.message 
  //                  ?? this.translate.instant('REGISTER_SPECIALIST.ERROR.UNEXPECTED');
  //   }
  // }

  async onSubmit() {
  // …validaciones…
  this.loading = true;
  this.error   = null;

  const fv = this.registroForm.value;
  const specialty = fv.especialidadNombre === 'other'
    ? fv.otraEspecialidad!
    : fv.especialidadNombre!;

  try {
    // // En vez de ref(...) + uploadBytes(...):
    // const file = fv.imagenPerfil!;
    // const path = `especialistas/${Date.now()}_${file.name}`;
    // const storageRef = this.afStorage.ref(path);
    // // compat-upload:
    // await this.afStorage.upload(path, file).toPromise();
    // // descarga URL:
    // const url = await storageRef.getDownloadURL().toPromise();

        // 1) sube imagen (compat)
    const file = fv.imagenPerfil!;
    const path = `especialistas/${Date.now()}_${file.name}`;
    const storageRef = this.afStorage.ref(path);
    const task = this.afStorage.upload(path, file);

    // Espera a que termine la subida
    await lastValueFrom(task.snapshotChanges());

    // 2) obtiene la URL
    const url = await lastValueFrom(storageRef.getDownloadURL());

    const nuevo: any = {
      nombre:   fv.nombre!,
      apellido: fv.apellido!,
      edad:     fv.edad!,
      dni:      fv.dni!,
      especialidad: specialty,
      email:    fv.email!,
      password: fv.password!,
      imagenPerfil: url
    };

    await this.especialistaService.addEspecialista(nuevo);
    this.loading = false;
    Swal.fire({
      icon: 'success',
      title: this.translate.instant('REGISTER_SPECIALIST.TITLE'),
      timer: 1500,
      showConfirmButton: false
    });
    this.registroForm.reset();
    this.imagenPrevia = null;

  } catch (err: any) {
    this.loading = false;
    this.error = err.message
      ?? this.translate.instant('REGISTER_SPECIALIST.ERROR.UNEXPECTED');
  }
}



}






// // registro-especialista.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators
// } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatSelectModule } from '@angular/material/select';
// import Swal from 'sweetalert2';

// //  Storage y funciones de la API modular:
// import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
// import { EspecialistaService } from '../../services/especialista.service';


// @Component({
//     selector: 'app-registro-especialista',
//     standalone:true,
//     imports: [
//         CommonModule,
//         ReactiveFormsModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatSelectModule,
//         MatButtonModule,
//         MatCardModule
//     ],
//     templateUrl: './registro-especialista.component.html',
//     styleUrls: ['./registro-especialista.component.scss']
// })
// export class RegistroEspecialistaComponent implements OnInit {

//   // Lista fija de especialidades + “Otro”
//   especialidades = [
//     'Cardiología',
//     'Dermatología',
//     'Ginecología',
//     'Pediatría',
//     'Neurología',
//     'Otro'
//   ];

//   imagenPrevia: string | null = null;

//   registroForm!: FormGroup<{
//     nombre: FormControl<string | null>;
//     apellido: FormControl<string | null>;
//     edad: FormControl<number | null>;
//     dni: FormControl<string | null>;
//     especialidad: FormControl<string | null>;
//     otraEspecialidad: FormControl<string | null>;
//     email: FormControl<string | null>;
//     password: FormControl<string | null>;
//     imagenPerfil: FormControl<File | null>;
//   }>;

//   constructor(
//     private fb: FormBuilder,
//     private especialistaService: EspecialistaService,
//     private storage: Storage            // 🔹 inyectar Storage
//   ) { }

//   ngOnInit() {
//     // Creamos el form con validaciones básicas
//     this.registroForm = this.fb.group({
//       nombre: this.fb.control<string | null>(null, Validators.required),
//       apellido: this.fb.control<string | null>(null, Validators.required),
//       edad: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
//       dni: this.fb.control<string | null>(null, Validators.required),
//       especialidad: this.fb.control<string | null>(null, Validators.required),
//       // inicializamos sin validadores; se los ponemos dinámicamente
//       otraEspecialidad: this.fb.control<string | null>(null),
//       email: this.fb.control<string | null>(null, [Validators.required, Validators.email]),
//       password: this.fb.control<string | null>(null, Validators.required),
//       imagenPerfil: this.fb.control<File | null>(null, Validators.required),
//     });

//     // Si elige “Otro”, requerimos el campo extra
//     this.registroForm.get('especialidad')!.valueChanges.subscribe(val => {
//       const ctrl = this.registroForm.get('otraEspecialidad')!;
//       if (val === 'Otro') {
//         ctrl.setValidators([Validators.required]);
//       } else {
//         ctrl.clearValidators();
//         ctrl.setValue(null);
//       }
//       ctrl.updateValueAndValidity();
//     });
//   }

//   onFileChange(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (!input.files?.length) return;

//     const file = input.files[0];
//     this.registroForm.get('imagenPerfil')!.setValue(file);
//     this.registroForm.get('imagenPerfil')!.markAsDirty();

//     const reader = new FileReader();
//     reader.onload = () => this.imagenPrevia = reader.result as string;
//     reader.readAsDataURL(file);
//   }

//   onSubmit() {
//     if (this.registroForm.invalid) {
//       this.registroForm.markAllAsTouched();
//       return;
//     }

//     const fv = this.registroForm.value;
//     const especialidadFinal = fv.especialidad === 'Otro'
//       ? fv.otraEspecialidad!
//       : fv.especialidad!;

//     const file = fv.imagenPerfil!;      // 📁 File
//     const filePath = `especialistas/${Date.now()}_${file.name}`;
//     const storageRef = ref(this.storage, filePath);

//     // 1) subimos la imagen a Storage
//     uploadBytes(storageRef, file)
//       .then(() => getDownloadURL(storageRef))
//       .then((url: string) => {
//         // 2) una vez subida, creamos el objeto con la URL
//         const nuevoEspecialista = {
//           nombre: fv.nombre!,
//           apellido: fv.apellido!,
//           edad: fv.edad!,
//           dni: fv.dni!,
//           especialidad: especialidadFinal,
//           email: fv.email!,
//           password: fv.password!,
//           imagenPerfil: url     // ◀️ URL en lugar de File
//         };

//         // 3) lo guardamos en Firestore
//         return this.especialistaService.addEspecialista(nuevoEspecialista)
//           .then(docRef =>
//             // opcional: guardar el id dentro del doc
//             this.especialistaService.updateEspecialista(docRef.id, { id: docRef.id })
//           );
//       })
//       .then(() => {
//         Swal.fire({
//           icon: 'success',
//           title: `Especialista registrado con éxito`,
//           showConfirmButton: false,
//           timer: 2000
//         });
//         this.registroForm.reset();
//         this.imagenPrevia = null;
//       })
//       .catch(err => {
//         console.error(err);
//         Swal.fire('Error', err.message, 'error');
//       });
//   }
  
// }




// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import {
// //   FormBuilder,
// //   FormControl,
// //   FormGroup,
// //   ReactiveFormsModule,
// //   Validators
// // } from '@angular/forms';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MatInputModule } from '@angular/material/input';
// // import { MatButtonModule } from '@angular/material/button';
// // import { MatCardModule } from '@angular/material/card';
// // import { MatSelectModule } from '@angular/material/select';
// // import Swal from 'sweetalert2';
// // import { EspecialistaService } from '../especialista.service';

// // @Component({
// //   selector: 'app-registro-especialista',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     ReactiveFormsModule,
// //     MatFormFieldModule,
// //     MatInputModule,
// //     MatSelectModule,
// //     MatButtonModule,
// //     MatCardModule
// //   ],
// //   templateUrl: './registro-especialista.component.html',
// //   styleUrls: ['./registro-especialista.component.scss']
// // })
