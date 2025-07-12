// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<firebase.User | null>;

  userId$: Observable<string>;

  constructor(private afAuth: AngularFireAuth) {
    // Primera inicialización
    this.user$ = this.afAuth.authState;

    // Ahora userId$ después de que afAuth ya está disponible
    this.userId$ = this.afAuth.authState.pipe(
      map(u => u?.uid ?? ''),
      shareReplay(1)
    );
  }

}



// // src/app/services/auth.service.ts
// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';        // <— IMPORT
// import { Observable } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   // declara user$ como firebase.User en lugar de @firebase/auth User
//  // user$: Observable<firebase.User | null>;

//   // constructor(private afAuth: AngularFireAuth) {
//   //   this.user$ = this.afAuth.authState;
//   // }

//     user$: Observable<firebase.User | null>;

//   // exposición de sólo el UID como Observable<string>
//   userId$ = this.afAuth.authState.pipe(
//     map(u => u?.uid ?? ''),
//     shareReplay(1)
//   );

//   constructor(private afAuth: AngularFireAuth) {
//     this.user$ = this.afAuth.authState;
//   }

// }



// // src/app/services/auth.service.ts
// import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   // Simula el usuario logueado; en producción vendrá de tu backend o Firebase Auth
//   get currentUser() {
//     return { uid: 'abc123-especialista' };
//   }
// }


// // src/app/services/auth.service.ts
// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Observable } from 'rxjs';
// import { User } from '@firebase/auth';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   user$: Observable<User | null>;

//   constructor(private afAuth: AngularFireAuth) {
//     this.user$ = this.afAuth.authState;  // emite null o el usuario cuando cambia
//   }
// }
