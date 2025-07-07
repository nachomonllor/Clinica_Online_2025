import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface AvailableSlot {
  date: string;     // 'YYYY-MM-DD'
  times: string[];  // ['08:00','09:00',…]
}

export interface Especialista {
  id: number;
  nombre: string;
  especialidad: string;
  imagenPerfil: string;
  // …otros campos…
  availableSlots?: AvailableSlot[];
}

@Component({
    selector: 'app-solicitar-turno',
    standalone:true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './solicitar-turno.component.html',
    styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {
  // -------------------------------------------

  turnoForm: FormGroup;
  especialidades = ['Cardiología', 'Dermatología', 'Neurología'];

  especialistas: Especialista[] = [
    { id:1, nombre:'Dr. Juan Pérez', especialidad:'Cardiología',    imagenPerfil:'/assets/icons/doctor1.JPG' },
    { id:2, nombre:'Dra. Marta López', especialidad:'Dermatología', imagenPerfil:'/assets/icons/doctor2.JPG' },
    { id:3, nombre:'Dr. Carlos Ruiz', especialidad:'Neurología',    imagenPerfil:'/assets/icons/healthcare.JPG' }
  ];

  constructor(private fb: FormBuilder) {
    this.turnoForm = this.fb.group({
      especialidad: ['', Validators.required],
      especialista: ['', Validators.required],
      fecha: ['', Validators.required],
      horario: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Genera slots para los 3 especialistas
    this.especialistas.forEach(e => {
      e.availableSlots = this.generateSlots(15);
    });
  }

  /** Genera un array de AvailableSlot para N días desde hoy */
  private generateSlots(days: number): AvailableSlot[] {
    const slots: AvailableSlot[] = [];
    const base = new Date();
    for (let i = 0; i < days; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const iso = d.toISOString().split('T')[0]; // 'YYYY-MM-DD'
      // Horarios cada hora de 08 a 16
      const times = Array.from({length: 9}, (_, k) => {
        const h = k + 8;
        return (h < 10 ? '0' + h : h) + ':00';
      });
      slots.push({ date: iso, times });
    }
    return slots;
  }

  /** Getter: especialistas filtrados por especialidad */
  get especialistasFiltrados(): Especialista[] {
    const esp = this.turnoForm.get('especialidad')?.value;
    return this.especialistas.filter(e => e.especialidad === esp);
  }

  /** Getter: especialista seleccionado */
  get selectedEspecialista(): Especialista | undefined {
    const name = this.turnoForm.get('especialista')?.value;
    return this.especialistas.find(e => e.nombre === name);
  }

  /** Getter: fechas disponibles del especialista */
  get availableDates(): string[] {
    return this.selectedEspecialista?.availableSlots?.map(s => s.date) || [];
  }

  /** Getter: horarios disponibles para la fecha elegida */
  get availableTimes(): string[] {
    const fecha = this.turnoForm.get('fecha')?.value;
    return this.selectedEspecialista
      ?.availableSlots
      ?.find(s => s.date === fecha)
      ?.times || [];
  }

  /** Setea especialista en el form */
  selectEspecialista(e: Especialista) {
    this.turnoForm.get('especialista')!.setValue(e.nombre);
    // limpia fecha+hora anteriores
    this.turnoForm.patchValue({ fecha: '', horario: '' });
  }

  /** Selecciona fecha en el form */
  selectDate(date: string) {
    this.turnoForm.get('fecha')!.setValue(date);
    this.turnoForm.get('horario')!.setValue('');
  }

  /** Selecciona horario en el form */
  selectTime(time: string) {
    this.turnoForm.get('horario')!.setValue(time);
  }

  /** Al confirmar: elimina el slot del especialista */
  onSubmit() {
    if (this.turnoForm.invalid) {
      this.turnoForm.markAllAsTouched();
      return;
    }

    const { fecha, horario } = this.turnoForm.value;
    console.log('Turno reservado:', this.turnoForm.value);

    // Elimina el horario reservado
    const spec = this.selectedEspecialista;
    if (spec && spec.availableSlots) {
      const slot = spec.availableSlots.find(s => s.date === fecha);
      if (slot) {
        slot.times = slot.times.filter(t => t !== horario);
        // si la fecha ya no tiene horas, la quitamos
        if (slot.times.length === 0) {
          spec.availableSlots = spec.availableSlots.filter(s => s.date !== fecha);
        }
      }
    }

    // Opcional: resetear formularios para nueva reserva
    this.turnoForm.reset();
  }
}

