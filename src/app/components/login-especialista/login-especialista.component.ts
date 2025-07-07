import { Component } from '@angular/core';

@Component({
    selector: 'app-login-especialista',
    standalone: true,
    imports: [],
    templateUrl: './login-especialista.component.html',
    styleUrl: './login-especialista.component.scss'
})
export class LoginEspecialistaComponent {


  // login-especialista.component.ts
  /*
  onSubmit() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then(cred => {
        this.db.doc(`especialista/${cred.user!.uid}`).get().toPromise()
          .then(doc => {
            if (doc.exists) {
              this.router.navigate(['/turno-especialista']);
            } else {
              this.snack.open('No estás registrado como especialista', 'Cerrar', { duration: 3000 });
            }
          });
      })
      .catch(err => this.snack.open(err.message, 'Cerrar', { duration: 3000 }));
  }
  */


}


