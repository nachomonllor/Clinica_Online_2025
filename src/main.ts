

// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

// AngularFire compat
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    // 1) HTTP client
    provideHttpClient(),
    provideRouter(routes),

    // 2) Chart.js (ng2-charts standalone)
    provideCharts(withDefaultRegisterables()),

    // 3) AngularFire compat modules
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule
    )
  ]
})
  .catch(err => console.error(err));


// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     provideRouter(routes),
//     provideCharts(withDefaultRegisterables()),
//     importProvidersFrom(
//       AngularFireModule.initializeApp(environment.firebase),
//       AngularFirestoreModule
//     )
//   ]
// }).catch(err => console.error(err));




// // main.ts
// import { enableProdMode, importProvidersFrom } from '@angular/core';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';

// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { provideStorage, getStorage } from '@angular/fire/storage';

// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// import { provideAnimations } from '@angular/platform-browser/animations';

// import { AppComponent } from './app/app.component';
// import { routes } from './app/app.routes';
// import { environment } from './environments/environment';
// import { provideHttpClient } from '@angular/common/http';
// import { provideCharts, withDefaultRegisterables } from 'ng2-charts';


// if (environment.production) {
//   enableProdMode();
// }

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),
//     provideCharts(withDefaultRegisterables()),

//     // Inyectamos NgModules de compat a través de importProvidersFrom:
//     importProvidersFrom(
//       SweetAlert2Module.forRoot(),
//       AngularFireModule.initializeApp(environment.firebase),
//       AngularFirestoreModule
//     ),

//     // Proveedores “modulares”:
//     provideFirebaseApp(() => initializeApp(environment.firebase)),
//     provideAuth(() => getAuth()),
//     provideFirestore(() => getFirestore()),
//     provideStorage(() => getStorage()),

//     provideAnimations(),
//     provideHttpClient()
//     //provideAnimationsAsync()


//   ]
// })
//   .catch(err => console.error(err));



// // main.ts
// import { enableProdMode, importProvidersFrom } from '@angular/core';
// import { bootstrapApplication }                from '@angular/platform-browser';
// import { provideRouter }                      from '@angular/router';

// import { provideFirebaseApp, initializeApp }  from '@angular/fire/app';
// import { provideAuth, getAuth }               from '@angular/fire/auth';
// import { provideFirestore, getFirestore }     from '@angular/fire/firestore';
// import { SweetAlert2Module }                  from '@sweetalert2/ngx-sweetalert2';

// import { AppComponent } from './app/app.component';
// import { routes }       from './app/app.routes';
// import { environment }  from './environments/environment';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// import { provideStorage, getStorage }          from '@angular/fire/storage';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// if (environment.production) {
//   enableProdMode();
// }

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),

//     // Módulos (NgModule) via importProvidersFrom
//     importProvidersFrom(
//       SweetAlert2Module.forRoot()
//     ),

//     // Providers “puros” (EnvironmentProviders) van aquí, fuera de importProvidersFrom
//     provideFirebaseApp(() => initializeApp(environment.firebase)),
//     provideAuth(() => getAuth()),
//     provideFirestore(() => getFirestore()),
//     provideAnimations(), provideAnimationsAsync(),    // ← IMPORTANTE: habilita BrowserAnimationsModule

//     provideStorage(()   => getStorage()),

//     // …otros providers como HttpClientModule, FormsModule, etc.
//   ]
// })
// .catch(err => console.error(err));



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
