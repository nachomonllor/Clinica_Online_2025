

// main.ts
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication }                from '@angular/platform-browser';
import { provideRouter, RouterModule }         from '@angular/router';
import { HttpClientModule, HttpClient }       from '@angular/common/http';
import { BrowserAnimationsModule }             from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader }   from '@ngx-translate/core';
import { TranslateHttpLoader }                from '@ngx-translate/http-loader';

import { AngularFireModule }                  from '@angular/fire/compat';
import { AngularFireAuthModule }              from '@angular/fire/compat/auth';
import { AngularFirestoreModule }             from '@angular/fire/compat/firestore';

import { AppComponent }                       from './app/app.component';
import { environment }                        from './environments/environment';
import { routes } from './app/app.routes';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// // Define aquí tus rutas
// const routes = [
//   { path: 'usuarios', component: UsuariosAdminComponent },
//   // ... otras rutas ...
//   { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
//   { path: '**', redirectTo: 'usuarios' }
// ];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),                      // ← aquí
    importProvidersFrom(
      BrowserAnimationsModule,                  // ← Material necesita animaciones
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFirestoreModule
    )
  ]
})
.catch(err => console.error(err));





// // src/main.ts
// import { enableProdMode, importProvidersFrom } from '@angular/core';
// import { bootstrapApplication }                from '@angular/platform-browser';
// import { HttpClientModule, HttpClient }       from '@angular/common/http';
// import { TranslateModule, TranslateLoader }   from '@ngx-translate/core';
// import { TranslateHttpLoader }                from '@ngx-translate/http-loader';
// import { AngularFireModule }                  from '@angular/fire/compat';
// import { AngularFireAuthModule }              from '@angular/fire/compat/auth';
// import { AngularFirestoreModule }             from '@angular/fire/compat/firestore';

// import { AppComponent }                       from './app/app.component';
// import { environment }                        from './environments/environment';
 
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

// if (environment.production) {
//   enableProdMode();
// }

// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(
//       // HTTP & translate
//       HttpClientModule,
//       TranslateModule.forRoot({
//         loader: {
//           provide: TranslateLoader,
//           useFactory: HttpLoaderFactory,
//           deps: [HttpClient]
//         }
//       }),
//       // Firebase
//       AngularFireModule.initializeApp(environment.firebase),
//       AngularFireAuthModule,
//       AngularFirestoreModule,
//       // aquí podrías añadir otros módulos (RouterModule, Material, etc.)
//     )
//   ]
// })
// .catch(err => console.error(err));







// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { AppComponent } from './app/app.component';
// import { environment } from './environments/environment';
// import { routes } from './app/app.routes';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { importProvidersFrom } from '@angular/core';

//  //import { provideTranslate } from '@ngx-translate/core';
// bootstrapApplication(AppComponent, {
//   providers: [
    
//     provideRouter(routes),
//     provideAnimations(),
//     provideHttpClient(withInterceptorsFromDi()),
//    // provideTranslate(), // <-- PARA IDIOMAS
//     importProvidersFrom(
//       AngularFireModule.initializeApp(environment.firebase),
//       AngularFireAuthModule,
//       AngularFirestoreModule
//     )
//   ]
// });



// // src/main.ts
// import { bootstrapApplication }    from '@angular/platform-browser';
// import { importProvidersFrom }     from '@angular/core';
// import { provideHttpClient }       from '@angular/common/http';
// import { provideRouter }           from '@angular/router';
// import { provideAnimations }       from '@angular/platform-browser/animations';

// import { AppComponent }            from './app/app.component';
// import { routes }                  from './app/app.routes';
// import { environment }             from './environments/environment';

// import { AngularFireModule }       from '@angular/fire/compat';
// import { AngularFireAuthModule }   from '@angular/fire/compat/auth';
// import { AngularFirestoreModule }  from '@angular/fire/compat/firestore';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     provideRouter(routes),
//     provideAnimations(),
//     importProvidersFrom(
//       AngularFireModule.initializeApp(environment.firebase),
//       AngularFireAuthModule,
//       AngularFirestoreModule
//     )
//   ]
// })
// .catch(err => console.error(err));




// // src/main.ts
// import { bootstrapApplication }    from '@angular/platform-browser';
// import { importProvidersFrom }     from '@angular/core';
// import { provideHttpClient }       from '@angular/common/http';
// import { provideRouter }           from '@angular/router';
// import { provideAnimations }       from '@angular/platform-browser/animations';

// import { AppComponent }            from './app/app.component';
// import { routes }                  from './app/app.routes';
// import { environment }             from './environments/environment';

// import { AngularFireModule }       from '@angular/fire/compat';
// import { AngularFireAuthModule }   from '@angular/fire/compat/auth';
// import { AngularFirestoreModule }  from '@angular/fire/compat/firestore';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     provideRouter(routes),
//     provideAnimations(),
//     importProvidersFrom(
//       AngularFireModule.initializeApp(environment.firebase),
//       AngularFireAuthModule,
//       AngularFirestoreModule
//     )
//   ]
// })
// .catch(err => console.error(err));




// // src/main.ts
// import { bootstrapApplication }      from '@angular/platform-browser';
// import { importProvidersFrom }       from '@angular/core';
// import { provideAnimations }         from '@angular/platform-browser/animations';
// import { provideHttpClient }         from '@angular/common/http';
// import { provideRouter }             from '@angular/router';
// import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

// import { AppComponent }              from './app/app.component';
// import { environment }               from './environments/environment';
// import { routes }                    from './app/app.routes';

// // SDK modular (Auth, Firestore, Storage)
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { getAuth, provideAuth }             from '@angular/fire/auth';
// import { getFirestore, provideFirestore }   from '@angular/fire/firestore';
// import { getStorage, provideStorage }       from '@angular/fire/storage';

// // API compat
// import { AngularFireModule }          from '@angular/fire/compat';
// import { AngularFireAuthModule }      from '@angular/fire/compat/auth';
// import { AngularFirestoreModule }     from '@angular/fire/compat/firestore';
// import { AngularFireStorageModule }   from '@angular/fire/compat/storage';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideAnimations(),
//     provideHttpClient(),
//     provideRouter(routes),
//     provideCharts(withDefaultRegisterables()),

//     // — SDK modular —
//     provideFirebaseApp(() => initializeApp(environment.firebase)),
//     provideAuth(() => getAuth()),
//     provideFirestore(() => getFirestore()),
//     provideStorage(() => getStorage()),

//     // — módulos compat (incluye FirestoreService necesita esto) —
//     importProvidersFrom(
//       AngularFireModule.initializeApp(environment.firebase),
//       AngularFireAuthModule,
//       AngularFirestoreModule,
//       AngularFireStorageModule
//     )
//   ]
// })
// .catch(err => console.error(err));



// // src/main.ts
// import { bootstrapApplication }     from '@angular/platform-browser';
// import { provideAnimations }       from '@angular/platform-browser/animations';
// import { provideHttpClient }       from '@angular/common/http';
// import { provideRouter }           from '@angular/router';
// import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

// import { AppComponent }            from './app/app.component';
// import { environment }             from './environments/environment';
// import { routes }                  from './app/app.routes';

// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { getAuth, provideAuth }             from '@angular/fire/auth';
// import { getFirestore, provideFirestore }   from '@angular/fire/firestore';
// import { getStorage, provideStorage }       from '@angular/fire/storage';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideAnimations(),            // o provideNoopAnimations()
//     provideHttpClient(),
//     provideRouter(routes),
//     provideCharts(withDefaultRegisterables()),

//     // 1) Inicializa FirebaseApp
//     provideFirebaseApp(() => initializeApp(environment.firebase)),

//     // 2) Provee Auth, Firestore y Storage (modular)
//     provideAuth(() => getAuth()),
//     provideFirestore(() => getFirestore()),
//     provideStorage(() => getStorage()),
//   ]
// }).catch(err => console.error(err));




// // src/main.ts
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { importProvidersFrom } from '@angular/core';
// import { provideHttpClient } from '@angular/common/http';
// import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

// import { AppComponent } from './app/app.component';
// import { environment } from './environments/environment';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';

// import { initializeApp } from 'firebase/app';
// import { provideFirebaseApp } from '@angular/fire/app';
// import { getAuth, provideAuth } from '@angular/fire/auth';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';


// bootstrapApplication(AppComponent, {
//   providers: [
//     // 0) Proveedor de animaciones (¡importante!)
//     provideAnimations(),

//     // 1) HTTP, rutas y gráficas
//     provideHttpClient(),
//     provideRouter(routes),
//     provideCharts(withDefaultRegisterables()),

//     // 2) Inicializa FirebaseApp
//     provideFirebaseApp(() => initializeApp(environment.firebase)),

//     // 3) Provee Auth y Firestore
//     provideAuth(() => getAuth()),
//     provideFirestore(() => getFirestore()),

//     // 4) (si aún necesitas compat) tus importProvidersFrom(...)
//     //    AngularFire compat modules
//     importProvidersFrom(
//       AngularFireModule.initializeApp(environment.firebase),
//       AngularFirestoreModule,
//       AngularFireAuthModule,
//       AngularFireStorageModule    // ← agrega esto
//     )
//   ]
// })
//   .catch(err => console.error(err));


// // src/main.ts
// import { bootstrapApplication } from '@angular/platform-browser';
// import { importProvidersFrom } from '@angular/core';
// import { provideHttpClient } from '@angular/common/http';
// import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

// // AngularFire compat
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// import { AppComponent } from './app/app.component';
// import { environment } from './environments/environment';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';

// import { getAuth, provideAuth } from '@angular/fire/auth';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// bootstrapApplication(AppComponent, {
//   providers: [
//     // 1) HTTP client
//     provideHttpClient(),
//     provideRouter(routes),

//     // 2) Chart.js (ng2-charts standalone)
//     provideCharts(withDefaultRegisterables()),

//     provideAuth(() => getAuth()),
//     provideFirestore(() => getFirestore()),

//     // 3) AngularFire compat modules
//     importProvidersFrom(
//       AngularFireModule.initializeApp(environment.firebase),
//       AngularFirestoreModule
//     )
//   ]
// })
//   .catch(err => console.error(err));


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
