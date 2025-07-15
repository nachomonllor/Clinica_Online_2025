// src/app/services/firestore.service.ts
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.model';

// Defino el tipo que realmente guardo en Firestore
export type FirestorePaciente = Omit<Paciente, 'password'> & {
  idPaciente: string;
  id?: string;            // opcional si usas valueChanges({idField})
};

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  // La colección ahora está parametrizada con FirestorePaciente
  private pacientesCollection: AngularFirestoreCollection<FirestorePaciente>;

  constructor(private afs: AngularFirestore) {
    this.pacientesCollection = this.afs.collection<FirestorePaciente>('pacientes');
  }

  /** Lista los pacientes, incluyendo el campo `id` si lo pides */
  getPacientes(): Observable<FirestorePaciente[]> {
    return this.pacientesCollection.valueChanges({ idField: 'id' });
  }

  /** Añade un paciente con ID generado */
  addPaciente(data: FirestorePaciente): Promise<any> {
    return this.pacientesCollection.add(data);
  }

  /** Actualiza un paciente por su ID */
  updatePaciente(id: string, data: Partial<FirestorePaciente>): Promise<void> {
    return this.pacientesCollection.doc(id).update(data);
  }

  /** Guarda (o reemplaza) un paciente en `pacientes/{uid}` */
  setPaciente(uid: string, data: FirestorePaciente): Promise<void> {
    return this.pacientesCollection.doc(uid).set(data);
  }

  /** Borra un paciente */
  deletePaciente(uid: string): Promise<void> {
    return this.pacientesCollection.doc(uid).delete();
  }
}
