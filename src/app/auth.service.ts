

// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Simula el usuario logueado; en producción vendrá de tu backend o Firebase Auth
  get currentUser() {
    return { uid: 'abc123-especialista' };
  }
}


// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }
