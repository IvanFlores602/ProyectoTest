import { Component, OnInit } from '@angular/core';
import { Cuestionario } from 'src/app/Models/Cuestionario';
import { Test } from 'src/app/Models/Test';
import { CuestionarioService } from 'src/app/Servicies/cuestionario.service';
import { UsuarioService } from 'src/app/Servicies/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test-tecnico',
  templateUrl: './test-tecnico.component.html',
  styleUrls: ['./test-tecnico.component.css']
})
export class TestTecnicoComponent implements OnInit {

  cuestionarios: Cuestionario[] = [];
  cuestionarioSeleccionado?: Cuestionario | undefined;
  idCuestionarioBusqueda?: number | undefined; 
  tituloCuestionarioBusqueda: string = ''; // Nueva propiedad para buscar por título

  constructor(private cuestionarioService: CuestionarioService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerTodosLosCuestionarios();
   
    this.id = localStorage.getItem('idUsuario')
  }

  obtenerTodosLosCuestionarios(): void {
    this.cuestionarioService.obtenerTodosLosCuestionarios().subscribe(
      cuestionarios => {
        this.cuestionarios = cuestionarios;
      },
      error => {
        console.error('Error al obtener los cuestionarios:', error);
      }
    );
  }

  examenId: number = 0
  buscarCuestionarioPorId(id: number): void {
    
    if (this.idCuestionarioBusqueda) {
      this.cuestionarioService.obtenerCuestionarioPorId(this.idCuestionarioBusqueda).subscribe(
        
        cuestionario => {
          this.cuestionarioSeleccionado = cuestionario;
          

          if (!cuestionario=== null) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El ID del cuestionario no existe.',
            });
          }
        },
        error => {
          console.error('Error al obtener el cuestionario:', error);
          if(this.cuestionarioSeleccionado === undefined){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El ID del cuestionario no existe.',
              });
            
          }
          this.cuestionarioSeleccionado = undefined;
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El ID del cuestionario a buscar es inválido.',
      });
      this.cuestionarioSeleccionado = undefined;
    }
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
    let nombreTest = this.cuestionarioSeleccionado?.titulo ?? '';
    
    opcionesSeleccionadas.forEach((opcion) => {
      const valor = opcion.value;
     
      if (valor === 'a') {
        puntajeTotal += 3;
        descripcion = "Excelente: En esta ocasión, tu desempeño fue sobresaliente. Respondiste de manera precisa y acertada a todas las preguntas.";
      } else if (valor === 'b') {
        puntajeTotal += 1;
        descripcion = "Buena: En esta segunda ronda, tu desempeño fue bueno. Respondiste correctamente a la mayoría de las preguntas";
      } else if (valor === 'c') {
        puntajeTotal += 1;
        descripcion = "Mala: En esta tercera ronda, tu desempeño fue insatisfactorio. Puede ser que hayas cometido errores en varias respuestas o que tus conocimientos en el área de sean limitados. ";
      } else if (valor === 'd') {
        puntajeTotal += 1;
        descripcion = "Peor: En esta cuarta ronda, tu desempeño fue el más bajo. Tus respuestas pueden haber sido incorrectas o poco claras en la mayoría de las preguntas.";
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
