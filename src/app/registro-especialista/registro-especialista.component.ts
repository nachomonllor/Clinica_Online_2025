
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatCardModule }      from '@angular/material/card';
import { MatSelectModule }    from '@angular/material/select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-especialista',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.scss']
})
export class RegistroEspecialistaComponent implements OnInit {

  // Lista fija de especialidades + “Otro”
  especialidades = [
    'Cardiología',
    'Dermatología',
    'Ginecología',
    'Pediatría',
    'Neurología',
    'Otro'
  ];

  imagenPrevia: string | null = null;

  registroForm!: FormGroup<{
    nombre:           FormControl<string | null>;
    apellido:         FormControl<string | null>;
    edad:             FormControl<number | null>;
    dni:              FormControl<string | null>;
    especialidad:     FormControl<string | null>;
    otraEspecialidad: FormControl<string | null>;
    email:            FormControl<string | null>;
    password:         FormControl<string | null>;
    imagenPerfil:     FormControl<File | null>;
  }>;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Creamos el form con validaciones básicas
    this.registroForm = this.fb.group({
      nombre:           this.fb.control<string | null>(null, Validators.required),
      apellido:         this.fb.control<string | null>(null, Validators.required),
      edad:             this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
      dni:              this.fb.control<string | null>(null, Validators.required),
      especialidad:     this.fb.control<string | null>(null, Validators.required),
      // inicializamos sin validadores; se los ponemos dinámicamente
      otraEspecialidad: this.fb.control<string | null>(null),
      email:            this.fb.control<string | null>(null, [Validators.required, Validators.email]),
      password:         this.fb.control<string | null>(null, Validators.required),
      imagenPerfil:     this.fb.control<File | null>(null, Validators.required),
    });

    // Si elige “Otro”, requerimos el campo extra
    this.registroForm.get('especialidad')!.valueChanges.subscribe(val => {
      const ctrl = this.registroForm.get('otraEspecialidad')!;
      if (val === 'Otro') {
        ctrl.setValidators([Validators.required]);
      } else {
        ctrl.clearValidators();
        ctrl.setValue(null);
      }
      ctrl.updateValueAndValidity();
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.registroForm.get('imagenPerfil')!.setValue(file);
    this.registroForm.get('imagenPerfil')!.markAsDirty();

    const reader = new FileReader();
    reader.onload = () => this.imagenPrevia = reader.result as string;
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    const fv = this.registroForm.value;
    // Determinamos la especialidad final
    const especialidadFinal = fv.especialidad === 'Otro'
      ? fv.otraEspecialidad
      : fv.especialidad;

    // Aquí mapearías a tu modelo de Especialista
    const nuevoEspecialista = {
      nombre:        fv.nombre!,
      apellido:      fv.apellido!,
      edad:          fv.edad!,
      dni:           fv.dni!,
      especialidad:  especialidadFinal!,
      email:         fv.email!,
      password:      fv.password!,
      imagenPerfil:  fv.imagenPerfil!
    };

    // Llamada al servicio y feedback
    // this.especialistaService.crear(nuevoEspecialista).subscribe(...)
    Swal.fire({
      icon: 'success',
      title: `Especialista ${nuevoEspecialista.nombre} ${nuevoEspecialista.apellido} registrado`,
      showConfirmButton: false,
      timer: 2000
    });

    // Reseteamos
    this.registroForm.reset();
    this.imagenPrevia = null;
  }
}



// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-registro-especialista',
//   standalone: true,
//   imports: [],
//   templateUrl: './registro-especialista.component.html',
//   styleUrl: './registro-especialista.component.scss'
// })
// export class RegistroEspecialistaComponent {

// }
