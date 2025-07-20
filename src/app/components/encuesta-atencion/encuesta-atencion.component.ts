// encuesta-atencion.component.ts :contentReference[oaicite:0]{index=0}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// 1) importa esto:
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-encuesta-atencion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    // 2) añade TranslateModule
    TranslateModule
  ],
  templateUrl: './encuesta-atencion.component.html',
  styleUrls: ['./encuesta-atencion.component.scss']
})
export class EncuestaAtencionComponent implements OnInit {
  encuestaForm!: FormGroup;
  starIcons = [1, 2, 3, 4, 5];

  // 3) inyecta TranslateService
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    // (opcional) sólo si quieres inicializar idiomas aquí:
    this.translate.addLangs(['es','en','pt']);
    this.translate.setDefaultLang('es');
    const browserLang = this.translate.getBrowserLang() ?? 'es';
    this.translate.use(
      ['es','en','pt'].includes(browserLang) ? browserLang : 'es'
    );
  }

  ngOnInit(): void {
    this.encuestaForm = this.fb.group({
      comentario: ['', Validators.required],
      calificacion: [0, [Validators.required, Validators.min(1)]],
      opcion: ['', Validators.required],
      aspectos: this.fb.group({
        puntualidad: [false],
        amabilidad: [false],
        limpieza: [false],
        explicacion: [false]
      }),
      rango: [5, Validators.required]
    });
  }

  setRating(value: number): void {
    this.encuestaForm.get('calificacion')?.setValue(value);
  }
  
  switchLang(lang: string) {
    this.translate.use(lang);
  }

  onSubmit(): void {
    if (this.encuestaForm.valid) {
      console.log('Encuesta enviada:', this.encuestaForm.value);
      // TODO: enviar al servicio
    } else {
      this.encuestaForm.markAllAsTouched();
    }
  }
}



// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-encuesta-atencion',
//   imports: [],
//   templateUrl: './encuesta-atencion.component.html',
//   styleUrl: './encuesta-atencion.component.scss'
// })
// export class EncuestaAtencionComponent {

// }