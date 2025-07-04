
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


    // …otros providers como HttpClientModule, FormsModule, etc.
  ]
})
.catch(err => console.error(err));



