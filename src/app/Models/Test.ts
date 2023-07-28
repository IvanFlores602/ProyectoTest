import { Usuario } from "./Usuario";
export class Test {
    id: number;
    nombreTest: string;
    puntaje: number;
    descripcion: string;
 
    constructor(nombreTest: string, puntaje: number, descripcion: string) {
        this.id = 0;
      this.nombreTest = nombreTest;
      this.puntaje = puntaje;
      this.descripcion = descripcion;
    }
  }