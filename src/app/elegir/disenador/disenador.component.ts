import { Component, OnInit } from '@angular/core';
import { CuestionarioService } from 'src/app/Servicies/cuestionario.service';
import { Cuestionario } from 'src/app/Models/Cuestionario';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/Servicies/usuario.service';
import { Test } from 'src/app/Models/Test';

@Component({
  selector: 'app-disenador',
  templateUrl: './disenador.component.html',
  styleUrls: ['./disenador.component.css']
})
export class DisenadorComponent implements OnInit {

  cuestionario: Cuestionario = {} as Cuestionario;
  constructor(private cuestionarioService: CuestionarioService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    const idCuestionario = 2; // Reemplaza con el ID del cuestionario que deseas obtener
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
    let nombreTest = "TEST TÉCNICO DE DISEÑO";

    opcionesSeleccionadas.forEach((opcion) => {
      const valor = opcion.value;

      if (valor === 'a') {
        puntajeTotal += 3;
        descripcion = "Excelente: Tu desempeño en algunas de las preguntas fue excepcional. Lograste demostrar un conocimiento profundo y comprensión sólida de los principios del diseño. Respondiste de manera precisa y acertada, mostrando un dominio en el tema. ";
      } else if (valor === 'b') {
        puntajeTotal += 1;
        descripcion = "Buena: En otras preguntas, tu desempeño fue bueno. Respondiste correctamente y mostraste un conocimiento general adecuado en el área del diseño. Aunque hubo algunas respuestas en las que no alcanzaste el nivel excelente, aún demostraste un buen entendimiento de los conceptos.";
      } else if (valor === 'c') {
        puntajeTotal += 1;
        descripcion = "Mala: En algunas ocasiones, tu desempeño fue insatisfactorio. Puede ser que hayas cometido errores o que tus respuestas no fueron del todo precisas en ciertos aspectos del diseño. Es posible que necesites revisar y reforzar ciertos conceptos.";
      } else if (valor === 'd') {
        puntajeTotal += 1;
        descripcion = "Peor: Hubo ocasiones en las que tu desempeño fue el más bajo. Tus respuestas pueden haber sido incorrectas o poco claras, lo que indica una comprensión limitada de algunos aspectos del diseño. Es importante dedicar tiempo a estudiar y practicar más para mejorar tus conocimientos. ";
      }
    });

    
    console.log('Puntaje total:', puntajeTotal);
    console.log('Descripción:', descripcion);
    console.log('Nombre del Test:', nombreTest);

    const test: Test = {
      id: 2,
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
