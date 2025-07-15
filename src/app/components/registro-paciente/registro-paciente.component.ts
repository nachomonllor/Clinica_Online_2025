// src/app/components/registro-paciente/registro-paciente.component.ts
import { Component, OnInit, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule      } from '@angular/material/input';
import { MatButtonModule     } from '@angular/material/button';
import { MatCardModule       } from '@angular/material/card';
import Swal                    from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, serverTimestamp } from '@angular/fire/firestore';
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
    MatCardModule,
    TranslateModule
  ],
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {
  registroPacienteForm!: FormGroup;
  imagenPrevia1: string | null = null;
  imagenPrevia2: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private injector: EnvironmentInjector,
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {
    this.translate.addLangs(['es','en','pt']);
    this.translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    const browserLang = this.translate.getBrowserLang() ?? 'es';
    this.translate.use(['es','en','pt'].includes(browserLang) ? browserLang : 'es');

    this.registroPacienteForm = this.fb.group({
      nombre:     [ null, Validators.required ],
      apellido:   [ null, Validators.required ],
      edad:       [ null, [Validators.required, Validators.min(0)] ],
      dni:        [ null, Validators.required ],
      obraSocial: [ null, Validators.required ],
      email:      [ null, [Validators.required, Validators.email] ],
      password:   [ null, Validators.required ],
      imagenPerfil1: [ null ],  // opcional
      imagenPerfil2: [ null ]   // opcional
    });
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  onFileChange(event: Event, idx: 1 | 2): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const control = idx === 1 ? 'imagenPerfil1' : 'imagenPerfil2';
    this.registroPacienteForm.get(control)!.setValue(file);
    this.registroPacienteForm.get(control)!.markAsDirty();
    const reader = new FileReader();
    reader.onload = () => {
      if (idx === 1) this.imagenPrevia1 = reader.result as string;
      else            this.imagenPrevia2 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  /** Sustituye TODO tu antiguo onSubmit aquí */
  async onSubmit() {
    if (this.registroPacienteForm.invalid) {
      this.registroPacienteForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = null;

    const { nombre, apellido, edad, dni, obraSocial, email, password } = this.registroPacienteForm.value;
    const file1 = this.registroPacienteForm.value.imagenPerfil1 as File | null;
    const file2 = this.registroPacienteForm.value.imagenPerfil2 as File | null;

    try {
      // — 1) Crear usuario en Auth —
      const cred = await runInInjectionContext(this.injector, () =>
        createUserWithEmailAndPassword(this.auth, email, password)
      );
      const uid = cred.user!.uid;

      // — 2) Subir imágenes (si vienen) —
      const urls: { img1?: string; img2?: string } = {};
      if (file1) {
        const path1 = `pacientes/${uid}/img1`;
        await runInInjectionContext(this.injector, () =>
          uploadBytes(ref(this.storage, path1), file1)
        );
        urls.img1 = await runInInjectionContext(this.injector, () =>
          getDownloadURL(ref(this.storage, path1))
        );
      }
      if (file2) {
        const path2 = `pacientes/${uid}/img2`;
        await runInInjectionContext(this.injector, () =>
          uploadBytes(ref(this.storage, path2), file2)
        );
        urls.img2 = await runInInjectionContext(this.injector, () =>
          getDownloadURL(ref(this.storage, path2))
        );
      }

      // — 3) Guardar documento en Firestore —
      const pacienteDoc = {
        idPaciente: uid,
        nombre, apellido,
        edad, dni, obraSocial, email,
        avatarUrl: urls.img1 ?? null,
        imagenPerfil1: urls.img1 ?? null,
        imagenPerfil2: urls.img2 ?? null,
        createdAt: serverTimestamp()
      };
      await runInInjectionContext(this.injector, () =>
        setDoc(doc(this.firestore, `pacientes/${uid}`), pacienteDoc)
      );

      // — 4) Feedback al usuario —
      await Swal.fire({
        icon: 'success',
        title: this.translate.instant('REGISTER.SUCCESS', { nombre, apellido }),
        timer: 2000,
        showConfirmButton: false
      });
      this.registroPacienteForm.reset();
      this.imagenPrevia1 = this.imagenPrevia2 = null;

    } catch (err: any) {
      console.error(err);
      this.error = err.code === 'auth/email-already-in-use'
        ? this.translate.instant('REGISTER.ERROR.EMAIL_IN_USE')
        : err.message || this.translate.instant('REGISTER.ERROR.UNEXPECTED');
    } finally {
      this.loading = false;
    }
  }
  
}





// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   FormControl,
//   ReactiveFormsModule
// } from '@angular/forms';

// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';

// import Swal from 'sweetalert2';

// import { FirestorePaciente, FirestoreService } from '../../services/firestore.service';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';

// import { AngularFireAuth } from '@angular/fire/compat/auth';

// import { firstValueFrom, lastValueFrom } from 'rxjs';
// import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';

// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';



// @Component({
//   selector: 'app-registro-paciente',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,

//     MatInputModule,
//     MatButtonModule,
//     MatCardModule,
//     TranslateModule,            // ← para usar | translate

//     AngularFireStorageModule

//   ],
//   templateUrl: './registro-paciente.component.html',
//   styleUrls: ['./registro-paciente.component.css']
// })
// export class RegistroPacienteComponent implements OnInit {

//   imagenPrevia1: string | null = null;
//   imagenPrevia2: string | null = null;
//   loading = false;

//   error: string | null = null;

//   registroPacienteForm!: FormGroup<{
//     nombre: FormControl<string | null>;
//     apellido: FormControl<string | null>;
//     edad: FormControl<number | null>;
//     dni: FormControl<string | null>;
//     obraSocial: FormControl<string | null>;
//     email: FormControl<string | null>;
//     password: FormControl<string | null>;
//     imagenPerfil1: FormControl<File | null>;
//     imagenPerfil2: FormControl<File | null>;
//   }>;

//   constructor(
//     private fb: FormBuilder,
//     private fsService: FirestoreService,

//     //private afStorage: AngularFireStorage,
//     private afAuth: AngularFireAuth,
//     private afStorage: AngularFireStorage,   // ← inyecta Storage aquí
//     private translate: TranslateService,  // ← inyectamos el servicio

//   ) {
//     // 1) registramos idiomas
//     this.translate.addLangs(['es', 'en', 'pt']);
//     // 2) idioma por defecto
//     this.translate.setDefaultLang('es');
//   }

//   ngOnInit(): void {
//     // 3) elegimos idioma inicial
//     const browserLang = this.translate.getBrowserLang() ?? 'es';
//     this.translate.use(['es', 'en', 'pt'].includes(browserLang) ? browserLang : 'es');

//     this.registroPacienteForm = this.fb.group({
//       nombre: this.fb.control<string | null>(null, Validators.required),
//       apellido: this.fb.control<string | null>(null, Validators.required),
//       edad: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
//       dni: this.fb.control<string | null>(null, Validators.required),
//       obraSocial: this.fb.control<string | null>(null, Validators.required),
//       email: this.fb.control<string | null>(null, [Validators.required, Validators.email]),
//       password: this.fb.control<string | null>(null, Validators.required),


//       // imagenPerfil1: this.fb.control<File | null>(null, Validators.required),
//       // imagenPerfil2: this.fb.control<File | null>(null, Validators.required),
//       imagenPerfil1: this.fb.control<File | null>(null),
//       imagenPerfil2: this.fb.control<File | null>(null),

//     });
//   }

//   /** Llamado por los botones ES/EN/PT */
//   switchLang(lang: string) {
//     this.translate.use(lang);
//   }

//   onFileChange(event: Event, idx: 1 | 2): void {
//     const input = (event.target as HTMLInputElement);
//     if (!input.files?.length) return;
//     const file = input.files[0];
//     const control = idx === 1 ? 'imagenPerfil1' : 'imagenPerfil2';
//     this.registroPacienteForm.get(control)!.setValue(file);
//     this.registroPacienteForm.get(control)!.markAsDirty();

//     const reader = new FileReader();
//     reader.onload = () => {
//       if (idx === 1) this.imagenPrevia1 = reader.result as string;
//       else this.imagenPrevia2 = reader.result as string;
//     };
//     reader.readAsDataURL(file);
//   }

//   async onSubmit() {
//     if (this.registroPacienteForm.invalid) {
//       this.registroPacienteForm.markAllAsTouched();
//       return;
//     }
//     this.loading = true;
//     this.error = null;

//     // 1) extraigo campos y archivos
//     const nombre = this.registroPacienteForm.get('nombre')!.value!;
//     const apellido = this.registroPacienteForm.get('apellido')!.value!;
//     const edad = this.registroPacienteForm.get('edad')!.value!;
//     const dni = this.registroPacienteForm.get('dni')!.value!;
//     const obraSocial = this.registroPacienteForm.get('obraSocial')!.value!;
//     const email = this.registroPacienteForm.get('email')!.value!;
//     const password = this.registroPacienteForm.get('password')!.value!;
//     const file1 = this.registroPacienteForm.get('imagenPerfil1')!.value!;
//     const file2 = this.registroPacienteForm.get('imagenPerfil2')!.value!;

//     try {
//       // 2) registro en Auth
//       const cred = await this.afAuth.createUserWithEmailAndPassword(email, password);
//       const uid = cred.user!.uid;

//       // 3) subo imágenes
//       const path1 = `pacientes/${uid}/img1`;
//       const path2 = `pacientes/${uid}/img2`;
//       await this.afStorage.upload(path1, file1);
//       await this.afStorage.upload(path2, file2);

//       // 4) obtengo URLs
//       const url1 = await firstValueFrom(this.afStorage.ref(path1).getDownloadURL());
//       const url2 = await firstValueFrom(this.afStorage.ref(path2).getDownloadURL());

//       // armo y guardo documento
//       const pacienteDoc: FirestorePaciente = {
//         idPaciente: uid,
//         id: uid,        // opcional: si quieres que valueChanges({idField}) lo liste
//         nombre, apellido,
//         edad, dni, obraSocial, email,
//         avatarUrl: url1,
//         imagenPerfil1: url1,
//         imagenPerfil2: url2
//       };

//       await this.fsService.setPaciente(uid, pacienteDoc);

//       // 6) feedback
//       await Swal.fire({
//         icon: 'success',
//         title: this.translate.instant('REGISTER.SUCCESS', { nombre, apellido }),
//         timer: 2000,
//         showConfirmButton: false
//       });
//       this.registroPacienteForm.reset();
//       this.imagenPrevia1 = this.imagenPrevia2 = null;

//     } catch (err: any) {
//       console.error(err);
//       this.error = err.code === 'auth/email-already-in-use'
//         ? this.translate.instant('REGISTER.ERROR.EMAIL_IN_USE')
//         : err.message || 'Unknown error';
//     } finally {
//       this.loading = false;
//     }
//   }



// }
