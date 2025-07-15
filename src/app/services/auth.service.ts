// src/app/services/auth.service.ts
import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut }       from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private auth: Auth,
    private injector: EnvironmentInjector
  ) {}

  login(email: string, password: string) {
    return runInInjectionContext(this.injector, () =>
      signInWithEmailAndPassword(this.auth, email, password)
    );
  }

  logout() {
    return runInInjectionContext(this.injector, () =>
      signOut(this.auth)
    );
  }
}






// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Observable } from 'rxjs';
// import firebase from 'firebase/compat/app';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   // DECLARAS la propiedad...
//   user$: Observable<firebase.User | null>;

//   // ...y la inicializas en el constructor, donde `afAuth` ya existe.
//   constructor(private afAuth: AngularFireAuth) {
//     this.user$ = this.afAuth.authState;
//   }

//   // Métodos limpios sin usar `inject()`
//   login(email: string, password: string) {
//     return this.afAuth.signInWithEmailAndPassword(email, password);
//   }

//   logout() {
//     return this.afAuth.signOut();
//   }
// }
