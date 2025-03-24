import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTurnos',
  standalone: true
})

// export class FiltroTurnosPipe implements PipeTransform {
//   transform(value: unknown, ...args: unknown[]): unknown {
//     return null;
//   }
// }

export class FiltroTurnosPipe implements PipeTransform {
  transform(turnos: any[], searchText: string): any[] {
    if (!turnos) return [];
    if (!searchText) return turnos;
    searchText = searchText.toLowerCase();
    return turnos.filter(turno => this.recursiveSearch(turno, searchText));
  }

  private recursiveSearch(obj: any, searchText: string): boolean {
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      const value = obj[key];
      if (value != null) {
        if (typeof value === 'object') {
          if (this.recursiveSearch(value, searchText)) return true;
        } else if (value.toString().toLowerCase().includes(searchText)) {
          return true;
        }
      }
    }
    return false;
  }
}