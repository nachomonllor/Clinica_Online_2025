import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule,
    CommonModule,
    MatCardModule,      // ya lo usas en registro-paciente :contentReference[oaicite:0]{index=0}
    MatButtonModule     // idem :contentReference[oaicite:1]{index=1}
  ]
})

export class AuthFormComponent {

  mode!: 'login' | 'register';
  role!: 'paciente' | 'especialista';

  email = '';
  password = '';

  // constructor(
  //   private route: ActivatedRoute,
  //   /* … resto de inyecciones … */
  // ) {
  //   this.route.paramMap.subscribe(p => {
  //     this.mode = p.get('mode') as 'login' | 'register';
  //     this.role = p.get('role') as 'paciente' | 'especialista';
  //   });
  // }
  // aquí podrías añadir más campos para el registro

  constructor(
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.route.paramMap.subscribe(p => {
      this.mode = p.get('mode') as 'login' | 'register';
      this.role = p.get('role') as 'paciente' | 'especialista';
    });
  }

  submit() {
    if (this.mode === 'login') {
      this.login();
    } else {
      this.register();
    }
  }

  // private async login() {
  //   try {
  //     const cred = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
  //     const doc = await this.db.doc(`${this.role}/${cred.user!.uid}`).get().toPromise();
  //     if (doc.exists) {
  //       // ok: redirige al dashboard de ese rol
  //       this.router.navigate([`/${this.role}/dashboard`]);
  //     } else {
  //       await this.afAuth.signOut();
  //       this.snack.open(`No estás registrado como ${this.role}`, 'Cerrar', { duration: 3000 });
  //     }
  //   } catch (err: any) {
  //     this.snack.open(err.message, 'Cerrar', { duration: 3000 });
  //   }
  // }

  private async login() {
    try {
      const cred = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      // obtenemos el snapshot del documento
      const docSnap = await this.db.doc(`${this.role}/${cred.user!.uid}`)
        .get()
        .toPromise();
      // 👇 Usamos el opcional ?. para no acceder a `exists` si docSnap es undefined
      if (docSnap?.exists) {
        this.router.navigate([`/${this.role}/dashboard`]);
      } else {
        await this.afAuth.signOut();
        this.snack.open(`No estás registrado como ${this.role}`, 'Cerrar', { duration: 3000 });
      }
    } catch (err: any) {
      this.snack.open(err.message, 'Cerrar', { duration: 3000 });
    }
  }

  private async register() {
    try {
      const cred = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      // guarda perfil en Firestore según rol
      await this.db.doc(`${this.role}/${cred.user!.uid}`)
        .set({ email: this.email, createdAt: new Date() /*…*/ });
      this.snack.open('Registro exitoso', 'Cerrar', { duration: 2000 });
      this.router.navigate([`/auth/login/${this.role}`]);
    } catch (err: any) {
      this.snack.open(err.message, 'Cerrar', { duration: 3000 });
    }
  }

}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-auth-form',
//   standalone: true,
//   imports: [],
//   templateUrl: './auth-form.component.html',
//   styleUrl: './auth-form.component.scss'
// })
// export class AuthFormComponent {

// }