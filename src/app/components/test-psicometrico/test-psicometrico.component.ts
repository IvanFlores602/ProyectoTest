import { Component, OnInit } from '@angular/core';
import { Examen, Pregunta, Respuesta } from 'src/app/Models/Examen';
import { Test } from 'src/app/Models/Test';
import { ExamenService } from 'src/app/Servicies/examen.service';
import { UsuarioService } from 'src/app/Servicies/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-test-psicometrico',
  templateUrl: './test-psicometrico.component.html',
  styleUrls: ['./test-psicometrico.component.css']
})
export class TestPsicometricoComponent implements OnInit {

  examenes: Examen[] = [];
  tests: Test[] = [];
  respuestas: Respuesta[] = [];
  examenEncontrado: Examen | null = null; 

  constructor(private examenService:ExamenService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('idUsuario')
    this.obtenerTodosLosExamenes() ;
    this.examenEncontrado = null;
  }
  
  
// Método para obtener todos los exámenes
obtenerTodosLosExamenes() {
 
  this.examenService.obtenerTodosLosExamenes().subscribe(
    (examenes) => {
      this.examenes = examenes;
    },
    (error) => {
      console.error('Error al obtener los exámenes:', error);
    }
  );
}
examenId: number = 0
// Método para obtener un examen por su ID

// Método para obtener un examen por su ID
buscarExamenPorId(id: number) {
  this.examenService.obtenerExamenPorId(id).subscribe(
    (examen) => {
      this.examenEncontrado = examen;
      if (this.examenEncontrado === null) {
        Swal.fire({
          title: 'Error',
          text: 'El ID proporcionado no existe',
          icon: 'error',
          showCancelButton: false
        });
      } else {
        this.respuestas = this.examenEncontrado.preguntas.map(pregunta => {
          if (pregunta.respuestas.length > 0) {
            return {
              valor: this.generarValorAleatorio(),
              texto: pregunta.respuestas[Math.floor(Math.random() * pregunta.respuestas.length)] //falta el .texto al final
            };
          } else {
            // Manejar el caso en que no hay respuestas disponibles
            return {
              valor: this.generarValorAleatorio(),
              texto: 'Respuesta no disponible'
            };
          }
        });
        
      }
      console.log('Examen por ID:', examen);
    },
    
    
    (error) => {
      console.error('Error al obtener el examen por ID:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al obtener el examen por ID',
        icon: 'error',
        showCancelButton: false
      });
    }
  );
  }

generarValorAleatorio(): number {
  // Genera un valor aleatorio entre 1 y 3 (puedes ajustar el rango según tus necesidades)
  return Math.floor(Math.random() * 3) + 1;
}
id: any;

enviarFormulario() {
  const opcionesSeleccionadas = document.querySelectorAll<HTMLInputElement>('input[type="radio"]:checked');
  if (opcionesSeleccionadas.length < 1) {
    Swal.fire({
      title: 'Error',
      text: 'Por favor, selecciona una respuesta para cada pregunta.',
      icon: 'error',
      showCancelButton: false
    });
    return;
  }
  
  let puntajeTotal = 0;
  let descripcion = '';
  let nombreTest = this.examenEncontrado?.nombre  ?? '';
 
  // Utiliza this.respuesta en lugar de opcionesSeleccionadas para calcular el puntajeTotal y descripcion
  this.respuestas.forEach((respuesta) => {
    const valor = respuesta.valor;
    if (valor === 3) {
      puntajeTotal += 3;
      descripcion = "Excelente: En esta ocasión, tu desempeño fue sobresaliente. Respondiste de manera precisa y acertada a todas las preguntas."; // Descripción correspondiente al valor 3
    } else if (valor === 2) {
      puntajeTotal += 2;
      descripcion = "Buena: En esta segunda ronda, tu desempeño fue bueno. Respondiste correctamente a la mayoría de las preguntas"; // Descripción correspondiente al valor 2
    } else if (valor === 1) {
      puntajeTotal += 1;
      descripcion = "Mala: En esta tercera ronda, tu desempeño fue insatisfactorio. Puede ser que hayas cometido errores en varias respuestas o que tus conocimientos en el área de sean limitados."; // Descripción correspondiente al valor 1
    }
  });

  console.log('Puntaje total:', puntajeTotal);
  console.log('Descripción:', descripcion);
  console.log('Nombre del Test', nombreTest);

  // Guardar las respuestas en el backend
  // Reemplaza con el ID del usuario correspondiente
  this.usuarioService.guardarFormulario(this.id, nombreTest, puntajeTotal, descripcion).subscribe(
    () => {
      Swal.fire({
        title: '¡Formulario enviado!',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
        timer: 3000,
        timerProgressBar: true,
      });
      console.log('Formulario enviado con éxito');
      // Realizar cualquier otra acción necesaria después de enviar el formulario
      
    },
    (error) => {
      console.error('Error al enviar el formulario:', error);
      // Manejar el error de manera adecuada
    }
  );

  
}


}
