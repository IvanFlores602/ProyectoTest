import { Component, OnInit } from '@angular/core';
import { CuestionarioService } from 'src/app/Servicies/cuestionario.service';
import { Cuestionario } from 'src/app/Models/Cuestionario';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/Servicies/usuario.service';

import { Test } from 'src/app/Models/Test';
@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.css']
})
export class TecnicoComponent implements OnInit {

  cuestionario: Cuestionario = {} as Cuestionario;
  constructor(private cuestionarioService: CuestionarioService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    const idCuestionario = 3; // Reemplaza con el ID del cuestionario que deseas obtener
    this.obtenerCuestionarioPorId(idCuestionario);
    this.id = localStorage.getItem('idUsuario')
  }

  obtenerCuestionarioPorId(idCuestionario: number): void {
    this.cuestionarioService.obtenerCuestionarioPorId(idCuestionario)
      .subscribe(
        (cuestionario: Cuestionario) => {
          this.cuestionario = cuestionario;
        },
        (error) => {
          console.error('Error al obtener el cuestionario:', error);
        }
      );
  }

  id: any;
  enviarFormularioTecnico() {
    const opcionesSeleccionadas = document.querySelectorAll<HTMLInputElement>('input[type="radio"]:checked');
    if (opcionesSeleccionadas.length < 10) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, selecciona una respuesta para cada pregunta.',
        icon: 'error',
        showCancelButton: false
      });
      return;
    }

    let puntajeTotal = 0;
    let descripcion = "";
    let nombreTest = "TEST TÉCNICO DE REDES";

    opcionesSeleccionadas.forEach((opcion) => {
      const valor = opcion.value;

      if (valor === 'a') {
        puntajeTotal += 3;
        descripcion = "Excelente: En esta ocasión, tu desempeño fue sobresaliente. Respondiste de manera precisa y acertada a todas las preguntas, demostrando un amplio conocimiento en el área de redes de computadoras. Tu dominio de los conceptos es evidente, y es claro que tienes un sólido entendimiento de los principios y componentes de las redes.";
      } else if (valor === 'b') {
        puntajeTotal += 1;
        descripcion = "Buena: En esta segunda ronda, tu desempeño fue bueno. Respondiste correctamente a la mayoría de las preguntas, mostrando un conocimiento general adecuado en el área de redes. Aunque hubo algunas respuestas que no fueron completamente precisas, aún así demostraste un buen entendimiento de los temas.";
      } else if (valor === 'c') {
        puntajeTotal += 1;
        descripcion = "Mala: En esta tercera ronda, tu desempeño fue insatisfactorio. Puede ser que hayas cometido errores en varias respuestas o que tus conocimientos en el área de redes sean limitados. Es posible que necesites revisar y reforzar ciertos conceptos para mejorar tus respuestas en el futuro.";
      } else if (valor === 'd') {
        puntajeTotal += 1;
        descripcion = "Peor: En esta cuarta ronda, tu desempeño fue el más bajo. Tus respuestas pueden haber sido incorrectas o poco claras en la mayoría de las preguntas, lo que indica que aún tienes dificultades en el tema de redes de computadoras. Es importante dedicar tiempo a estudiar y practicar más para mejorar tus conocimientos y respuestas.";
      }
    });

    
    console.log('Puntaje total:', puntajeTotal);
    console.log('Descripción:', descripcion);
    console.log('Nombre del Test:', nombreTest);

    const test: Test = {
      id: 3,
      puntaje: puntajeTotal,
      descripcion: descripcion,
      nombreTest: nombreTest
    };
   
    this.usuarioService.guardarFormularioT(this.id, nombreTest, puntajeTotal, descripcion ).subscribe(
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
      },
      (error) => {
        console.error('Error al enviar el formulario:', error);
        // Manejar el error de manera adecuada
      }
    );

  }
}
