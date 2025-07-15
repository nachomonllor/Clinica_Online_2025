// src/app/services/patient-auth.service.ts
import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class PatientAuthService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private injector: EnvironmentInjector
  ) { }

  /** 
   * Intenta loguear y valida que en Firestore exista el paciente.
   * Si no existe, hace logout y lanza error.
   */
  // src/app/services/patient-auth.service.ts
  async loginPaciente(email: string, password: string) {
    // 1) Login
    const cred = await runInInjectionContext(this.injector, () =>
      signInWithEmailAndPassword(this.auth, email, password)
    );
    console.log('✅ Login OK, UID =', cred.user!.uid);

    // 2) Chequeo en Firestore
    const path = `pacientes/${cred.user!.uid}`;
    console.log('🔍 Comprobando documento en:', path);
    const ref = doc(this.firestore, path);
    const snap = await runInInjectionContext(this.injector, () =>
      getDoc(ref)
    );
    console.log('📄 snap.exists() =', snap.exists(), ' | data =', snap.data());

    if (!snap.exists()) {
      // No es un paciente válido: desloguea y error
      await runInInjectionContext(this.injector, () =>
        signOut(this.auth)
      );
      throw new Error('NOT_REGISTERED');
    }

    return cred; // todo OK
  }

  logout() {
    return runInInjectionContext(this.injector, () =>
      signOut(this.auth)
    );
  }

}

  // async loginPaciente(email: string, password: string) {
  //   // 1) Login
  //   const cred = await runInInjectionContext(this.injector, () =>
  //     signInWithEmailAndPassword(this.auth, email, password)
  //   );

  //   // 2) Chequeo en Firestore
  //   const ref = doc(this.firestore, `pacientes/${cred.user!.uid}`);
  //   const snap = await runInInjectionContext(this.injector, () =>
  //     getDoc(ref)
  //   );

  //   if (!snap.exists()) {
  //     // No es un paciente válido: desloguea y error
  //     await runInInjectionContext(this.injector, () =>
  //       signOut(this.auth)
  //     );
  //     throw new Error('NOT_REGISTERED');
  //   }

  //   return cred; // todo OK
  // }


/* import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientAuthService {

  constructor() { }
} */