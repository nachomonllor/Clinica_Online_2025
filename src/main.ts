
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
    provideAnimations(),    // ← IMPORTANTE: habilita BrowserAnimationsModule


    // …otros providers como HttpClientModule, FormsModule, etc.
  ]
})
.catch(err => console.error(err));



// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';
// import { AppComponent } from './app/app.component';
// import { routes } from './app/app.routes';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes), provideAnimationsAsync()
//   ]
// });



// // src/main.ts
// import { bootstrapApplication } from '@angular/platform-browser';
// import { importProvidersFrom }   from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { AppComponent } from './app/app.component';
// import { provideRouter }   from '@angular/router';
// import { routes }          from './app/app.routes';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),
//     importProvidersFrom(BrowserAnimationsModule)
//   ]
// });



// // main.ts
// import { enableProdMode, importProvidersFrom } from '@angular/core';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// import { AppComponent } from './app/app.component';
// import { routes } from './app/app.routes';
// import { environment } from './environments/environment';

// if (environment.production) {
//   enableProdMode();
// }

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),
//     importProvidersFrom(
//       SweetAlert2Module.forRoot(),
//       // Inicializa Firebase con la config del environment
//       provideFirebaseApp(() => initializeApp(environment.firebase)),
//       provideAuth(() => getAuth()),
//       provideFirestore(() => getFirestore())
//     )
//     // …otros proveedores (FormsModule, HttpClientModule, etc.)
//   ]
// })
// .catch(err => console.error(err));
