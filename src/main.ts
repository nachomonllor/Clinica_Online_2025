
// main.ts
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication }                from '@angular/platform-browser';
import { provideRouter }                      from '@angular/router';

import { provideFirebaseApp, initializeApp }  from '@angular/fire/app';
import { provideAuth, getAuth }               from '@angular/fire/auth';
import { provideFirestore, getFirestore }     from '@angular/fire/firestore';
import { SweetAlert2Module }                  from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app/app.component';
import { routes }       from './app/app.routes';
import { environment }  from './environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideStorage, getStorage }          from '@angular/fire/storage';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    // Módulos (NgModule) via importProvidersFrom
    importProvidersFrom(
      SweetAlert2Module.forRoot()
    ),

    // Providers “puros” (EnvironmentProviders) van aquí, fuera de importProvidersFrom
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimations(), provideAnimationsAsync(),    // ← IMPORTANTE: habilita BrowserAnimationsModule

    provideStorage(()   => getStorage()),


    // …otros providers como HttpClientModule, FormsModule, etc.
  ]
})
.catch(err => console.error(err));



// // app.module.ts
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { provideFirebaseApp, initializeApp }  from '@angular/fire/app';
// import { provideFirestore, getFirestore }      from '@angular/fire/firestore';
// import { provideAuth, getAuth }                from '@angular/fire/auth';
// import { environment } from '../environments/environment';

// import { AppComponent } from './app.component';
// // … tus otros imports

// @NgModule({
//   declarations: [AppComponent /* … */],
//   imports: [
//     BrowserModule,
//     // inicializa Firebase
//     provideFirebaseApp(() => initializeApp(environment.firebase)),
//     // Cloud Firestore
//     provideFirestore(() => getFirestore()),
//     // Auth (si lo usarás)
//     provideAuth(() => getAuth()),
//     // … tus otros módulos
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
