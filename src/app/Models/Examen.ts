export class Examen {
    id: number; // Agregamos un valor inicial (puede ser cualquier valor adecuado)
    nombre: string;
    preguntas: Pregunta[];
    
    constructor() {
        this.id= 0;
        this.nombre = '';
        this.preguntas = [];
    }
  }
  
  export class Pregunta {
    id: number; // Agregamos un valor inicial (puede ser cualquier valor adecuado)
    titulo: string;
    respuestas: string[];

    constructor() {
        this.id= 0;
        this.titulo = '';
        this.respuestas = [];
    }

  }
  export interface Respuesta {
    valor: number;
    texto: string;
  }

  
  