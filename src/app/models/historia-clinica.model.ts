import { DatoDinamico } from "./dato-dinamico.model";

export interface HistoriaClinica {
    altura: number;
    peso: number;
    temperatura: number;
    presion: string;
    datosDinamicos?: DatoDinamico[];
}