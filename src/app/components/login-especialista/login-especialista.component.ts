import { Component, OnInit }              from '@angular/core';
import { CommonModule }                    from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
}                                          from '@angular/forms';
import { RouterModule, Router }            from '@angular/router';
import { MatCardModule }                   from '@angular/material/card';
import { MatFormFieldModule }              from '@angular/material/form-field';
import { MatInputModule }                  from '@angular/material/input';
import { MatButtonModule }                 from '@angular/material/button';
import { MatProgressSpinnerModule }        from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule }  from '@angular/material/snack-bar';

import { AngularFireAuth }                 from '@angular/fire/compat/auth';
import { AngularFirestore }                from '@angular/fire/compat/firestore';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-especialista',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    TranslateModule
  ],
  templateUrl: './login-especialista.component.html',
  styleUrls: ['./login-especialista.component.scss']
})
export class LoginEspecialistaComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private snack: MatSnackBar,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['es','en','pt']);
    this.translate.setDefaultLang('es');
  }

  ngOnInit() {
    const browserLang = this.translate.getBrowserLang() ?? 'es';
    this.translate.use(
      ['es','en','pt'].includes(browserLang) ? browserLang : 'es'
    );

    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = null;

    const { email, password } = this.loginForm.value;
    try {
      const cred = await this.afAuth.signInWithEmailAndPassword(email, password);
      // Verifica que exista en la colección "especialistas"
      this.afs.doc(`especialistas/${cred.user!.uid}`)
        .get()
        .subscribe(docSnap => {
          this.loading = false;
          if (docSnap.exists) {
            this.router.navigate(['/mis-turnos-especialista']);
          } else {
            this.afAuth.signOut();
            this.error = this.translate.instant('LOGIN_SPECIALIST.ERROR.NOT_REGISTERED');
          }
        });
    } catch(err: any) {
      this.loading = false;
      this.error = err.message
        ?? this.translate.instant('LOGIN_SPECIALIST.ERROR.UNEXPECTED');
    }
  }
}
