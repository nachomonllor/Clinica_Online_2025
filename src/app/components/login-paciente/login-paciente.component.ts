import { Component, OnInit }       from '@angular/core';
import { CommonModule }             from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
}                                   from '@angular/forms';
import { RouterModule, Router }     from '@angular/router';
import { MatCardModule }            from '@angular/material/card';
import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatInputModule }           from '@angular/material/input';
import { MatButtonModule }          from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AngularFireAuth }          from '@angular/fire/compat/auth';
import { AngularFirestore }         from '@angular/fire/compat/firestore';
import { take }                     from 'rxjs/operators';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-paciente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    TranslateModule           // ← para usar | translate
  ],
  templateUrl: './login-paciente.component.html',
  styleUrls: ['./login-paciente.component.css']
})
export class LoginPacienteComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private snack: MatSnackBar,
    private translate: TranslateService      // ← inyecta TranslateService
  ) {
    // Registra y configura idiomas
    this.translate.addLangs(['es','en','pt']);
    this.translate.setDefaultLang('es');
  }

  ngOnInit() {
    // Inicializa idioma según navegador
    const browserLang = this.translate.getBrowserLang() ?? 'es';
    this.translate.use(['es','en','pt'].includes(browserLang) ? browserLang : 'es');

    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = null;

    const { email, password } = this.loginForm.value;
    try {
      const cred = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.afs
        .doc(`pacientes/${cred.user!.uid}`)
        .get()
        .pipe(take(1))
        .subscribe(docSnap => {
          this.loading = false;
          if (docSnap.exists) {
            this.router.navigate(['/mis-turnos']);
          } else {
            this.afAuth.signOut();
            this.error = this.translate.instant('LOGIN.ERROR.NOT_REGISTERED');
          }
        });
    } catch (err: any) {
      this.loading = false;
      this.error = err.message ?? this.translate.instant('LOGIN.ERROR.UNEXPECTED');
    }
  }
}







// import { Component, OnInit }       from '@angular/core';
// import { CommonModule }             from '@angular/common';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   ReactiveFormsModule
// }                                   from '@angular/forms';
// import { RouterModule, Router }     from '@angular/router';
// import { MatCardModule }            from '@angular/material/card';
// import { MatFormFieldModule }       from '@angular/material/form-field';
// import { MatInputModule }           from '@angular/material/input';
// import { MatButtonModule }          from '@angular/material/button';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// import { AngularFireAuth }          from '@angular/fire/compat/auth';
// import { AngularFirestore }         from '@angular/fire/compat/firestore';
// import { take }                     from 'rxjs/operators';

// @Component({
//   selector: 'app-login-paciente',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     RouterModule,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatProgressSpinnerModule,
//     MatSnackBarModule
//   ],
//   templateUrl: './login-paciente.component.html',
//   styleUrls: ['./login-paciente.component.css']
// })
// export class LoginPacienteComponent implements OnInit {
//   loginForm!: FormGroup;
//   loading = false;
//   error: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private afAuth: AngularFireAuth,
//     private afs: AngularFirestore,
//     private router: Router,
//     private snack: MatSnackBar
//   ) {}

//   ngOnInit() {
//     this.loginForm = this.fb.group({
//       email:    ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   async onSubmit() {
//     if (this.loginForm.invalid) {
//       this.loginForm.markAllAsTouched();
//       return;
//     }
//     this.loading = true;
//     this.error = null;

//     const { email, password } = this.loginForm.value;
//     try {
//       // 1) Loguea al usuario en Firebase Auth
//       const cred = await this.afAuth.signInWithEmailAndPassword(email, password);

//       // 2) Busca en la colección pacientes si ese UID existe
//       this.afs
//         .doc(`pacientes/${cred.user!.uid}`)
//         .get()
//         .pipe(take(1))
//         .subscribe(docSnap => {
//           this.loading = false;
//           if (docSnap.exists) {
//             this.router.navigate(['/mis-turnos']);
//           } else {
//             this.afAuth.signOut();
//             this.error = 'No estás registrado como paciente';
//           }
//         });
//     } catch (err: any) {
//       this.loading = false;
//       this.error = err.message ?? 'Error inesperado';
//     }
//   }
// }
