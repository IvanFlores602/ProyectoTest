import { Component, OnInit } from '@angular/core';
import { Examen, Pregunta, Respuesta } from 'src/app/Models/Examen';
import { ExamenService } from 'src/app/Servicies/examen.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-psicometrico',
  templateUrl: './psicometrico.component.html',
  styleUrls: ['./psicometrico.component.css']
})
export class PsicometricoComponent implements OnInit {

 ngOnInit(): void {
     
 }
 
 constructor( private examenService: ExamenService, private router:Router) {
   
 }

    nombreExamen: string = '';
    nuevoExamen: Examen = new Examen();
    preguntas: Pregunta[] = [new Pregunta()];
    preguntaActual: Pregunta = new Pregunta();
    

    agregarPregunta() {
      
      this.preguntas.push(new Pregunta());
      this.preguntas[this.preguntas.length - 1].respuestas = []; // Inicializar respuestas vacías
    }
    
    agregarRespuesta(indicePregunta: number) {
      
      this.preguntas[indicePregunta].respuestas.push(""); // Agregar una respuesta vacía
    }
    
    eliminarRespuesta(indicePregunta: number, indiceRespuesta: number) {
      this.preguntas[indicePregunta].respuestas.splice(indiceRespuesta, 1);
    }
    
    
  
  guardarExamen() {
    // Validar que el nombre del examen no esté vacío
  if (this.nombreExamen.trim() === '') {
    Swal.fire({
      title: 'Error',
      text: 'Debe ingresar un nombre titulo para el examen.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  // Validar que al menos una pregunta haya sido agregada
  if (this.preguntas.length === 0) {
    Swal.fire({
      title: 'Error',
      text: 'Debe agregar al menos una pregunta antes de guardar el examen.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  // Validar que ninguna pregunta o respuesta esté vacía
  for (const pregunta of this.preguntas) {
    if (pregunta.titulo.trim() === '') {
      Swal.fire({
        title: 'Error',
        text: 'Debe ingresar un texto para todas las preguntas.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

 
  }
    
    const nuevoExamen: Examen = new Examen();
    nuevoExamen.nombre = this.nombreExamen;
    nuevoExamen.preguntas = this.preguntas;
    
    this.examenService.crearExamen(nuevoExamen).subscribe(
      (examenCreado) => {
        console.log("Examen creado:", examenCreado);
        Swal.fire({
          title: 'Examen creado',
          icon: 'success',
          text: 'El examen ha sido creado exitosamente.',
          confirmButtonText: 'Aceptar'
        });
        // Realiza cualquier otra acción que necesites después de crear el examen
      },
      (error) => {
        console.error("Error al crear el examen:", error);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Ocurrió un error al crear el examen.',
          confirmButtonText: 'Aceptar'
        });
        // Maneja el error de manera apropiada
      }
    );
  }
  

  logout(): void {
    localStorage.setItem('idUsuario', '')
    localStorage.removeItem('token');
    this.router.navigate(['/']); 
    Swal.fire({
      title: '¡Sesión desactivada!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Aceptar',
      timer: 1000,
      timerProgressBar: true,
    });
  }
}


