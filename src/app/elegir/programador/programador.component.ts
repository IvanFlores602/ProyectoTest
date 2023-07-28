import { Component, OnInit } from '@angular/core';
import { CuestionarioService } from 'src/app/Servicies/cuestionario.service';
import { Cuestionario } from 'src/app/Models/Cuestionario';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/Servicies/usuario.service';

import { Test } from 'src/app/Models/Test';

@Component({
  selector: 'app-programador',
  templateUrl: './programador.component.html',
  styleUrls: ['./programador.component.css']
})
export class ProgramadorComponent implements OnInit {
  
  cuestionario: Cuestionario = {} as Cuestionario;
  constructor(private cuestionarioService: CuestionarioService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    // Lógica para obtener el cuestionario por su ID
    const idCuestionario = 1; // Reemplaza con el ID del cuestionario que deseas obtener
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
    let nombreTest = "TEST TÉCNICO DE BACKEND Y FRONTEND";

    opcionesSeleccionadas.forEach((opcion) => {
      const valor = opcion.value;

      if (valor === 'a') {
        puntajeTotal += 3;
        descripcion = "eres una persona que tiene ciertos conocimientos sobre tecnologías web y desarrollo, pero no está completamente familiarizada con todos los términos y conceptos específicos. Reconoce que Spring Boot es un framework de desarrollo web, pero no tiene una comprensión detallada de todas sus características. También sabe que Angular es un framework de desarrollo frontend, pero puede no estar al tanto de todas sus capacidades. Aunque no proporcionó descripciones precisas para Java Persistence API (JPA), demuestra una comprensión general de su relevancia en el contexto del desarrollo de bases de datos.";
      } else if (valor === 'b') {
        puntajeTotal += 1;
        descripcion = "Desarolla mas las capacidades Reconoce correctamente la naturaleza de Spring Boot y Angular, y aprecia las ventajas que ofrecen en el desarrollo web, como la mejora del rendimiento de las consultas SQL y la capacidad para crear interfaces de usuario dinámicas. También comprende que Java Persistence API (JPA) es una especificación importante para el mapeo objeto-relacional en Java.";
      } else if (valor === 'c') {
        puntajeTotal += 1;
        descripcion = "Tu puedes desarrolla tus capacidades tienes una visión clara sobre las tecnologías web y desarrollo. Identifica correctamente a Spring Boot y Angular como frameworks de desarrollo web y frontend, respectivamente, y aprecia las ventajas que brindan, como la configuración simplificada y la creación de interfaces de usuario interactivas. ";
      } else if (valor === 'd') {
        puntajeTotal += 1;
        descripcion = "Te recomiendo que leas un curso conocimiento muy limitado o nulo sobre tecnologías web y desarrollo. Es posible que no esté familiarizada con los términos como Spring Boot, Angular y Java Persistence API (JPA) y su relación con el desarrollo de aplicaciones web y bases de datos. Esta opción sugiere que la persona necesita una introducción y capacitación básica en el campo del desarrollo web y las tecnologías asociadas para poder entender mejor estos conceptos y su relevancia en el ámbito de la programación y desarrollo de aplicaciones. ";
      }
    });

    
    console.log('Puntaje total:', puntajeTotal);
    console.log('Descripción:', descripcion);
    console.log('Nombre del Test:', nombreTest);

    const test: Test = {
      id: 1,
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
