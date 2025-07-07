
// login-paciente.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { MatCardModule }       from '@angular/material/card';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/compat/firestore';

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
    MatSnackBarModule,

    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  templateUrl: './login-paciente.component.html',
  styleUrls: ['./login-paciente.component.css']
})
export class LoginPacienteComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // login-paciente.component.ts
onSubmit(): void {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const { email, password } = this.loginForm.value;

  this.afAuth.signInWithEmailAndPassword(email, password)
    .then(cred =>
      this.db.doc(`paciente/${cred.user!.uid}`).get().toPromise()
    )
    .then(docSnap => {
      if (docSnap?.exists) {
        this.router.navigate(['/mis-turnos']);
      } else {
        this.afAuth.signOut();
        this.snack.open('No estás registrado como paciente', 'Cerrar', { duration: 3000 });
      }
    })
    .catch(err => {
      // ← Aquí el console.error para ver el código
      console.error('LOGIN ERROR CODE:', err.code, err);
      this.snack.open(err.message, 'Cerrar', { duration: 3000 });
    });
}




  // onSubmit(): void {
  //   if (this.loginForm.invalid) {
  //     this.loginForm.markAllAsTouched();
  //     return;
  //   }
  //   const { email, password } = this.loginForm.value;

  //   this.afAuth.signInWithEmailAndPassword(email, password)
  //     .then(cred =>
  //       this.db.doc(`paciente/${cred.user!.uid}`).get().toPromise()
  //     )
  //     .then(docSnap => {
  //       if (docSnap?.exists) {
  //         // Redirijo al dashboard de paciente
  //         this.router.navigate(['/mis-turnos']);
  //       } else {
  //         // No existe en la colección de pacientes: cierro sesión y muestro error
  //         this.afAuth.signOut();
  //         this.snack.open('No estás registrado como paciente', 'Cerrar', { duration: 3000 });
  //       }
  //     })
  //     .catch(err => {
  //       this.snack.open(err.message, 'Cerrar', { duration: 3000 });
  //     });
  // }


}




// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';

// @Component({
//   selector: 'app-login-paciente',
//   standalone: true,
//   imports: [FormsModule, CommonModule, ReactiveFormsModule,
   
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule
//   ],
//   templateUrl: './login-paciente.component.html',
//   styleUrl: './login-paciente.component.css'
// })

// export class LoginPacienteComponent implements OnInit {
//   loginForm!: FormGroup;

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     // Solo se requiere email y password para el login
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       const loginData = this.loginForm.value;
//       // Aquí integras el servicio de autenticación (por ejemplo, con Firebase)
//       console.log('Datos de login del paciente:', loginData);
//       // Llama al servicio de autenticación y maneja la respuesta (redireccionar, mostrar error, etc.)
//     } else {
//       // En caso de formulario inválido, marca todos los controles como "touched" para mostrar errores
//       this.loginForm.markAllAsTouched();
//     }
//   }

// }