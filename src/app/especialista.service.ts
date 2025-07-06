import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Especialista } from './models/especialista.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {
  private especialistasCol: AngularFirestoreCollection<Especialista>;

  constructor(private afs: AngularFirestore) {
    this.especialistasCol = this.afs.collection<Especialista>('especialistas');
  }

  /**
   * Obtiene un Observable con todos los especialistas (incluye campo 'id').
   */
  getEspecialistas(): Observable<Especialista[]> {
    return this.especialistasCol.valueChanges({ idField: 'id' });
  }

  /**
   * Crea un nuevo especialista.
   */
  addEspecialista(especialistaData: any): Promise<any> {
    return this.especialistasCol.add(especialistaData);
  }

  /**
   * Actualiza un especialista existente por su ID.
   */
  updateEspecialista(id: string, updateData: any): Promise<void> {
    return this.especialistasCol.doc(id).update(updateData);
  }
}


// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EspecialistaService {

//   constructor() { }
// }
