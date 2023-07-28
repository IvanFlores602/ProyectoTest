import { Tesp } from "./Tesp";

export class Usuario {
    idUsuario: number;
    nombre: string;
    apellido: string;
    correoElectronico: string;
    contrasena: string;
    genero: string;
    edad: number;
    telefono: number;
    ocupacion: string;

    constructor() {
      this.idUsuario = 0;
      this.nombre = '';
      this.apellido = '';
      this.correoElectronico = '';
      this.contrasena = '';
      this.genero = '';
      this.edad = 0;
      this.telefono = 0;
      this.ocupacion = '';
      
    }
}
