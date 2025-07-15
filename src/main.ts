// src/main.ts
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication }                from '@angular/platform-browser';
import { provideRouter }                       from '@angular/router';
import { provideAnimations }                   from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppComponent } from './app/app.component';
import { routes }       from './app/app.routes';
import { environment }  from './environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth }              from '@angular/fire/auth';
import { provideFirestore, getFirestore }    from '@angular/fire/firestore';
import { provideStorage, getStorage }        from '@angular/fire/storage';
import { setLogLevel, LogLevel }             from '@angular/fire';

// Silenciar warnings de AngularFire zonales
setLogLevel(LogLevel.SILENT);

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      HttpClientModule,
      ReactiveFormsModule,
      TranslateModule.forRoot({ /* … */ })
    ),

    // Firebase modular (sin compat)
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())       // ← aquí
  ]
}).catch(err => console.error(err));





// bootstrapApplication(AppComponent, {
//   providers: [
//     provideAnimations(),                // Angular Material animations
//     provideRouter(routes),              // enrutamiento
//     provideHttpClient(),                // cliente HTTP para Translate

//     // Módulos standalone aún no migrados
//     importProvidersFrom(
//       HttpClientModule,
//       ReactiveFormsModule,
//       TranslateModule.forRoot({
//         loader: {
//           provide: TranslateLoader,
//           useFactory: HttpLoaderFactory,
//           deps: [HttpClient]
//         }
//       })
//     ),




// // src/main.ts
// import { enableProdMode, importProvidersFrom } from '@angular/core';
// import { bootstrapApplication }                from '@angular/platform-browser';
// import { provideRouter }                       from '@angular/router';
// import { provideAnimations }                   from '@angular/platform-browser/animations';
// import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// import { provideFirebaseApp, initializeApp }   from '@angular/fire/app';
// import { provideAuth, getAuth }                from '@angular/fire/auth';
// import { provideFirestore, getFirestore }      from '@angular/fire/firestore';

// import { AppComponent } from './app/app.component';
// import { routes }       from './app/app.routes';
// import { environment }  from './environments/environment';

// if (environment.production) {
//   enableProdMode();
// }

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideAnimations(),
//     provideRouter(routes),
//     provideHttpClient(withInterceptorsFromDi()),

//     // Firebase modular
//     provideFirebaseApp(() => initializeApp(environment.firebase)),
//     provideAuth(() => getAuth()),
//     provideFirestore(() => getFirestore())
//   ]
// }).catch(err => console.error(err));





// import { enableProdMode, importProvidersFrom } from '@angular/core';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';

// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { HttpLoaderFactory } from './app/http-loader.factory';

// import { AppComponent } from './app/app.component';
// import { routes } from './app/app.routes';
// import { environment } from './environments/environment';

// // Firebase (modular)
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// // Compat modules (if still using @angular/fire/compat)
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// if (environment.production) {
//   enableProdMode();
// }

// bootstrapApplication(AppComponent, {
//   providers: [
//     // Register Angular Material animations
//     provideAnimations(),
//     // Routing
//     provideRouter(routes),
//     // Traditional NgModules as providers
//     importProvidersFrom(
//       HttpClientModule,
//       ReactiveFormsModule,
//       AngularFireModule.initializeApp(environment.firebase),
//       AngularFireAuthModule,
//       AngularFirestoreModule,
//       TranslateModule.forRoot({
//         loader: {
//           provide: TranslateLoader,
//           useFactory: HttpLoaderFactory,
//           deps: [HttpClient]
//         }
//       })
//     ),
//     // Modular Firebase providers
//     provideFirebaseApp(() => initializeApp(environment.firebase)),
//     provideAuth(() => getAuth()),
//     provideFirestore(() => getFirestore())
//   ]
// }).catch(err => console.error(err));

