






import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import Swal from 'sweetalert2';

import { firstValueFrom } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { createUserWithEmailAndPassword, Auth } from '@angular/fire/auth';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';

// Añade:

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
    TranslateModule,            // ← para usar | translate

  ],
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {

  imagenPrevia1: string | null = null;
  imagenPrevia2: string | null = null;
  loading = false;

  error: string | null = null;    

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
    // private afStorage: AngularFireStorage,
    // private auth: Auth,

    private afStorage: AngularFireStorage,
    private afAuth: AngularFireAuth,

    private translate: TranslateService    // ← inyectamos el servicio
  ) {
    // 1) registramos idiomas
    this.translate.addLangs(['es', 'en', 'pt']);
    // 2) idioma por defecto
    this.translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    // 3) elegimos idioma inicial
    const browserLang = this.translate.getBrowserLang() ?? 'es';
    this.translate.use(['es', 'en', 'pt'].includes(browserLang) ? browserLang : 'es');

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

  /** Llamado por los botones ES/EN/PT */
  switchLang(lang: string) {
    this.translate.use(lang);
  }

  onFileChange(event: Event, idx: 1 | 2): void {
    const input = (event.target as HTMLInputElement);
    if (!input.files?.length) return;
    const file = input.files[0];
    const control = idx === 1 ? 'imagenPerfil1' : 'imagenPerfil2';
    this.registroPacienteForm.get(control)!.setValue(file);
    this.registroPacienteForm.get(control)!.markAsDirty();

    const reader = new FileReader();
    reader.onload = () => {
      if (idx === 1) this.imagenPrevia1 = reader.result as string;
      else this.imagenPrevia2 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // async onSubmit(): Promise<void> {
  //   if (this.registroPacienteForm.invalid) {
  //     this.registroPacienteForm.markAllAsTouched();
  //     return;
  //   }
  //   this.loading = true;
  //   const fv = this.registroPacienteForm.value!;

  //   try {
  //     // 1) Crea y loguea al paciente
  //     //await createUserWithEmailAndPassword(this.auth, fv.email!, fv.password!);

  //     this.loading = true;
  //     const { email, password } = this.registroPacienteForm.value;
  //     const cred = await this.afAuth.createUserWithEmailAndPassword(email!, password!);

  //     // 2) Prepara las subidas
  //     const file1 = fv.imagenPerfil1!;
  //     const file2 = fv.imagenPerfil2!;
  //     const path1 = `pacientes/${Date.now()}_${file1.name}`;
  //     const path2 = `pacientes/${Date.now()}_${file2.name}`;

  //     const task1 = this.afStorage.upload(path1, file1);
  //     const task2 = this.afStorage.upload(path2, file2);
  //     const ref1 = this.afStorage.ref(path1);
  //     const ref2 = this.afStorage.ref(path2);

  //     // 3) Espera a que terminen las subidas
  //     await firstValueFrom(task1.snapshotChanges());
  //     await firstValueFrom(task2.snapshotChanges());

  //     // 4) Obtiene las URLs
  //     const [url1, url2] = await Promise.all([
  //       firstValueFrom(ref1.getDownloadURL()),
  //       firstValueFrom(ref2.getDownloadURL())
  //     ]);

  //     // 5) Guarda en Firestore
  //     const nuevoPaciente = {
  //       nombre: fv.nombre!,
  //       apellido: fv.apellido!,
  //       edad: fv.edad!,
  //       dni: fv.dni!,
  //       obraSocial: fv.obraSocial!,
  //       email: fv.email!,
  //       password: fv.password!,
  //       imagenPerfil1: url1,
  //       imagenPerfil2: url2
  //     };
  //     const docRef = await this.fsService.addPaciente(nuevoPaciente);
  //     await this.fsService.updatePaciente(docRef.id, { id: docRef.id });

  //     // 6) Éxito
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Paciente registrado con éxito',
  //       showConfirmButton: false,
  //       timer: 2000
  //     });
  //     this.registroPacienteForm.reset();
  //     this.imagenPrevia1 = this.imagenPrevia2 = null;

  //   } catch (err: any) {
  //     console.error(err);
  //     Swal.fire('Error', err.message || err, 'error');
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  async onSubmit(): Promise<void> {
    if (this.registroPacienteForm.invalid) {
      this.registroPacienteForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const {
      nombre, apellido, edad, dni,
      obraSocial, email, password,
      imagenPerfil1, imagenPerfil2
    } = this.registroPacienteForm.value;

    try {
      // 1) Crea el usuario en Auth
      const cred = await this.afAuth.createUserWithEmailAndPassword(
        email!, password!
      );

      const uid = cred.user!.uid;                 // ← Aquí usas cred

      // 2) Sube imagen 1
      const path1 = `pacientes/${uid}/perfil1.jpg`;
      const ref1 = this.afStorage.ref(path1);
      await ref1.put(imagenPerfil1!);
      const url1 = await ref1.getDownloadURL().toPromise();

      // 3) Sube imagen 2
      const path2 = `pacientes/${uid}/perfil2.jpg`;
      const ref2 = this.afStorage.ref(path2);
      await ref2.put(imagenPerfil2!);
      const url2 = await ref2.getDownloadURL().toPromise();

      // 4) Guarda todos los datos en Firestore
      await this.fsService.createDocument(
        {
          id: uid, nombre, apellido, edad, dni,
          obraSocial, email, imagenPerfil1: url1,
          imagenPerfil2: url2
        },
        'pacientes', uid
      );

      this.loading = false;
      Swal.fire({
        icon: 'success',
        title: this.translate.instant('REGISTER.SUCCESS'),
        confirmButtonText: this.translate.instant('REGISTER.GO_LOGIN')
      });

    } catch (err: any) {
      this.loading = false;
      this.error = err.message ?? this.translate.instant('REGISTER.ERROR.UNEXPECTED');
    }
  }



}
