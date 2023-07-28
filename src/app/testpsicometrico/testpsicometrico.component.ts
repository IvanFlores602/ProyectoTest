import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../Servicies/usuario.service';

@Component({
  selector: 'app-testpsicometrico',
  templateUrl: './testpsicometrico.component.html',
  styleUrls: ['./testpsicometrico.component.css']
})
export class TestpsicometricoComponent implements OnInit {
  
  
  constructor(private usuarioService: UsuarioService) {
    this.id = localStorage.getItem('idUsuario')
   }

  ngOnInit(): void {
  }


  

  id: any;

  enviarFormulario() {
    const opcionesSeleccionadas = document.querySelectorAll<HTMLInputElement>('input[type="radio"]:checked');
    if (opcionesSeleccionadas.length < 14) {
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
    let nombreTest = 'Test Psicometrico';
  
    opcionesSeleccionadas.forEach((opcion) => {
      const valor = opcion.value;
  
      if (valor === 'a') {
        puntajeTotal += 3;
        descripcion = " Eres una persona extrovertida y sociable, que disfruta de la compañía de amigos y participa activamente en actividades sociales. Te gusta asumir desafíos, tomar decisiones basadas en la información disponible y adaptarte a diferentes situaciones. Manejas el estrés de manera efectiva y te sientes cómodo/a en un ambiente de trabajo equilibrado que fomente la colaboración y la concentración individual. Te relacionas fácilmente con nuevas personas y tienes habilidades para liderar o seguir según las necesidades del grupo.";
      } else if (valor === 'b') {
        puntajeTotal += 2; 
        descripcion = "Eres una persona introvertida y reservada, que prefiere momentos de tranquilidad y tiempo a solas. Te enfrentas a los desafíos de manera cautelosa, prefiriendo evitar situaciones complicadas. Tienes la capacidad de tomar decisiones, pero a veces prefieres que otros decidan por ti. Te adaptas a las circunstancias según tu nivel de confianza. Manejas el estrés de manera individual y encuentras paz en un ambiente de trabajo tranquilo, sin muchas distracciones. Te toma tiempo abrirte a nuevas personas, pero te relacionas adecuadamente cuando te sientes cómodo/a.";
      } else if (valor === 'c') {
        puntajeTotal += 1;
        descripcion = "Eres una persona equilibrada en términos de sociabilidad, que disfruta tanto de la compañía de amigos y las actividades sociales, como de momentos de tranquilidad y tiempo a solas. Te enfrentas a los desafíos adaptándote según la situación y tu nivel de confianza. Tienes la capacidad de tomar decisiones considerando la información disponible y te adaptas fácilmente a las necesidades y habilidades del equipo de trabajo. Manejas el estrés de manera efectiva y te sientes cómodo/a en un ambiente de trabajo equilibrado que combine la interacción constante y la concentración individual. Te relacionas de manera adecuada con nuevas personas y tienes la flexibilidad de seguir una rutina establecida o adaptarte a la flexibilidad según las circunstancias.";
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

