import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';
import { Paciente } from '../models/paciente.model';

@Component({
  selector: 'app-registro-paciente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './registro-paciente.component.html',
  styleUrl: './registro-paciente.component.css'
})

export class RegistroPacienteComponent implements OnInit {

  imagenPrevia1: string | null = null;
  imagenPrevia2: string | null = null;

  constructor(private fb: FormBuilder) {}

  registroForm!: FormGroup<{
    nombre:        FormControl<string | null>;
    apellido:      FormControl<string | null>;
    edad:          FormControl<number | null>;
    dni:           FormControl<string | null>;
    obraSocial:    FormControl<string | null>;
    email:         FormControl<string | null>;
    password:      FormControl<string | null>;
    imagenPerfil1: FormControl<File | null>;
    imagenPerfil2: FormControl<File | null>;
  }>;

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre:        this.fb.control<string | null>(null, Validators.required),
      apellido:      this.fb.control<string | null>(null, Validators.required),
      edad:          this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
      dni:           this.fb.control<string | null>(null, Validators.required),
      obraSocial:    this.fb.control<string | null>(null, Validators.required),
      email:         this.fb.control<string | null>(null, [Validators.required, Validators.email]),
      password:      this.fb.control<string | null>(null, Validators.required),
      imagenPerfil1: this.fb.control<File | null>(null, Validators.required),
      imagenPerfil2: this.fb.control<File | null>(null, Validators.required),
    });
  }
  
  onFileChange(event: Event, imagenIndex: 1 | 2): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    // Actualizamos el FormControl correspondiente
    const controlName = imagenIndex === 1 ? 'imagenPerfil1' : 'imagenPerfil2';
    this.registroForm.get(controlName)!.setValue(file);
    this.registroForm.get(controlName)!.markAsDirty();

    // Creamos la vista previa
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (imagenIndex === 1) {
        this.imagenPrevia1 = result;
      } else {
        this.imagenPrevia2 = result;
      }
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const fv = this.registroForm.value as unknown as Paciente;

      // Aquí llamarías a tu servicio:
      // this.pacienteService.crearPaciente(fv).subscribe(...);

      Swal.fire({
        icon: 'success',
        title: `Paciente ${fv.nombre} ${fv.apellido} registrado`,
        showConfirmButton: false,
        timer: 2000
      });

      this.registroForm.reset();
      this.imagenPrevia1 = this.imagenPrevia2 = null;
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}


// export class RegistroPacienteComponent implements OnInit {
//   registroForm!: FormGroup;
//   imagenPrevia1: string | null = null;
//   imagenPrevia2: string | null = null;

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.registroForm = this.fb.group({
//       nombre: ['', Validators.required],
//       apellido: ['', Validators.required],
//       edad: [null, [Validators.required, Validators.min(0)]],
//       dni: ['', Validators.required],
//       obraSocial: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       imagenPerfil1: [null, Validators.required],
//       imagenPerfil2: [null, Validators.required]
//     });
//   }


//   onSubmit(): void {
//     if (this.registroForm.valid) {
//       // Extraemos todos los valores
//       const fv = this.registroForm.value;

//       // Mapeamos a la interfaz Paciente
//       const nuevoPaciente: Paciente = {
//         nombre:        fv.nombre!,
//         apellido:      fv.apellido!,
//         edad:          fv.edad!,
//         dni:           fv.dni!,
//         obraSocial:    fv.obraSocial!,
//         email:         fv.email!,
//         password:      fv.password!,
//         imagenPerfil1: fv.imagenPerfil1!,
//         imagenPerfil2: fv.imagenPerfil2!
//       };

//       // Aquí podrías llamar a tu servicio:
//       // this.pacienteService.crearPaciente(nuevoPaciente).subscribe(...);

//       // Mostramos el SweetAlert
//       Swal.fire({
//         icon: 'success',
//         title: `Paciente ${nuevoPaciente.nombre} ${nuevoPaciente.apellido} registrado`,
//         showConfirmButton: false,
//         timer: 2000
//       });

//       // Reseteamos todo
//       this.registroForm.reset();
//       this.imagenPrevia1 = this.imagenPrevia2 = null;

//     } else {
//       this.registroForm.markAllAsTouched();
//     }
//   }
// }

/*
export class RegistroPacienteComponent implements OnInit {
  registroForm!: FormGroup;
  imagenPrevia1: string | null = null;
  imagenPrevia2: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(0)]],
      dni: ['', Validators.required],
      obraSocial: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      imagenPerfil1: [null, Validators.required],
      imagenPerfil2: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      // Extraemos todos los valores
      const fv = this.registroForm.value;

      // Mapeamos a la interfaz Paciente
      const nuevoPaciente: Paciente = {
        nombre:        fv.nombre!,
        apellido:      fv.apellido!,
        edad:          fv.edad!,
        dni:           fv.dni!,
        obraSocial:    fv.obraSocial!,
        email:         fv.email!,
        password:      fv.password!,
        imagenPerfil1: fv.imagenPerfil1!,
        imagenPerfil2: fv.imagenPerfil2!
      };

      // Aquí podrías llamar a tu servicio:
      // this.pacienteService.crearPaciente(nuevoPaciente).subscribe(...);

      // Mostramos el SweetAlert
      Swal.fire({
        icon: 'success',
        title: `Paciente ${nuevoPaciente.nombre} ${nuevoPaciente.apellido} registrado`,
        showConfirmButton: false,
        timer: 2000
      });

      // Reseteamos todo
      this.registroForm.reset();
      this.imagenPrevia1 = this.imagenPrevia2 = null;

    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}
  */



/*
export class RegistroPacienteComponent implements OnInit {
  registroForm!: FormGroup;
  imagenPrevia1: string | ArrayBuffer | null = null;
  imagenPrevia2: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(0)]],
      dni: ['', Validators.required],
      obraSocial: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      imagenPerfil1: [null, Validators.required],
      imagenPerfil2: [null, Validators.required]
    });
  }

  onFileChange(event: any, imagen: number): void {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      this.registroForm.patchValue(imagen === 1
        ? { imagenPerfil1: file }
        : { imagenPerfil2: file });
      const reader = new FileReader();
      reader.onload = e => {
        if (imagen === 1) this.imagenPrevia1 = e.target?.result ?? null;
        else this.imagenPrevia2 = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
    }
  }

  // onSubmit(): void {
  //   if (this.registroForm.valid) {
  //     console.log('Datos de registro del paciente:', this.registroForm.value);
  //     // TODO: llamar servicio de registro
  //   } else {
  //     this.registroForm.markAllAsTouched();
  //   }
  // }


  onSubmit(): void {
  if (this.registroForm.valid) {
    const { nombre, apellido } = this.registroForm.value;
    // Mostramos el SweetAlert
    Swal.fire({
      icon: 'success',
      title: `Paciente ${nombre} ${apellido} registrado`,
      showConfirmButton: false,
      timer: 2000
    });
    // Aquí podrías llamar a tu servicio de registro...
    // y luego, por ejemplo, resetear el formulario:
    this.registroForm.reset();
    this.imagenPrevia1 = this.imagenPrevia2 = null;
  } else {
    this.registroForm.markAllAsTouched();
  }
}


onSubmit(): void {
  if (this.registroForm.invalid) { return; }

  // Si las imágenes las capturas con un <input type="file">,
  // tendrás que extraer el File manualmente antes de armar el objeto.
  const formValues = this.registroForm.value;

  const nuevoPaciente: Paciente = {
    nombre:        formValues.nombre,
    apellido:      formValues.apellido,
    edad:          formValues.edad,
    dni:           formValues.dni,
    obraSocial:    formValues.obraSocial,
    email:         formValues.email,
    password:      formValues.password,
    imagenPerfil1: formValues.imagenPerfil1, 
    imagenPerfil2: formValues.imagenPerfil2
  };

}

}
*/






// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-registro-paciente',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './registro-paciente.component.html',
//   styleUrl: './registro-paciente.component.css'
// })

// export class RegistroPacienteComponent implements OnInit {
//   registroForm!: FormGroup;
//   imagenPrevia1: string | ArrayBuffer | null = null;
//   imagenPrevia2: string | ArrayBuffer | null = null;

//   constructor(private fb: FormBuilder) { }

//   ngOnInit(): void {
//     this.registroForm = this.fb.group({
//       nombre: ['', Validators.required],
//       apellido: ['', Validators.required],
//       edad: [null, [Validators.required, Validators.min(0)]],
//       dni: ['', Validators.required],
//       obraSocial: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       imagenPerfil1: [null, Validators.required],
//       imagenPerfil2: [null, Validators.required]
//     });
//   }

//   onFileChange(event: any, imagen: number): void {
//     if (event.target.files && event.target.files.length) {
//       const file = event.target.files[0];
//       if (imagen === 1) {
//         this.registroForm.patchValue({ imagenPerfil1: file });
//       } else if (imagen === 2) {
//         this.registroForm.patchValue({ imagenPerfil2: file });
//       }
//       // Leer archivo para previsualización
//       const reader = new FileReader();
//       // reader.onload = (e) => {
//       //   if (imagen === 1) {
//       //     this.imagenPrevia1 = e.target?.result;
//       //   } else if (imagen === 2) {
//       //     this.imagenPrevia2 = e.target?.result;
//       //   }
//       // };

//       reader.onload = (e) => {
//         if (imagen === 1) {
//           this.imagenPrevia1 = e.target?.result ?? null;
//         } else if (imagen === 2) {
//           this.imagenPrevia2 = e.target?.result ?? null;
//         }
//       };
      


//       reader.readAsDataURL(file);
//     }
//   }

//   onSubmit(): void {
//     if (this.registroForm.valid) {
//       const pacienteData = this.registroForm.value;
//       console.log('Datos de registro del paciente:', pacienteData);
//       // Integra aquí el servicio de registro (por ejemplo, utilizando Firebase)
//     } else {
//       this.registroForm.markAllAsTouched();
//     }
//   }
// }