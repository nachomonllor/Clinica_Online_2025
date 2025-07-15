// import { Component, Inject, OnInit } from '@angular/core';
// import { FormControl, ReactiveFormsModule } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';

// export interface ComentarioDialogData { motivo: string; }

// @Component({
//   selector: 'app-comentario-dialog',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatDialogModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule
//   ],
//    templateUrl: './comentario-dialog.component.html',
//    styleUrl: './comentario-dialog.component.scss'
// })
// export class ComentarioDialogComponent implements OnInit {
//   motivoCtrl!: FormControl<string>;

//   constructor(
//     public dialogRef: MatDialogRef<ComentarioDialogComponent, ComentarioDialogData>,
//     @Inject(MAT_DIALOG_DATA) public data: ComentarioDialogData
//   ) {}

//   ngOnInit(): void {
//     // Ahora data ya está inyectado
//     this.motivoCtrl = new FormControl(this.data.motivo, { nonNullable: true });
//   }

//   onCancelar(): void {
//     this.dialogRef.close();
//   }

//   onAceptar(): void {
//     this.dialogRef.close({ motivo: this.motivoCtrl.value });
//   }
// }


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-comentario-dialog',
//   imports: [],
//   templateUrl: './comentario-dialog.component.html',
//   styleUrl: './comentario-dialog.component.scss'
// })
// export class ComentarioDialogComponent {

// }
