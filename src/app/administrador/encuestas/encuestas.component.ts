import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Cuestionario } from 'src/app/Models/Cuestionario';
import { CuestionarioService } from 'src/app/Servicies/cuestionario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {
  cuestionarios: Cuestionario[] = [];

  nuevoCuestionario: Cuestionario = {
    titulo: '',
    pregunta1: '',
    respuesta11: '',
    respuesta12: '',
    respuesta13: '',
    respuesta14: '',
    pregunta2: '',
    respuesta21: '',
    respuesta22: '',
    respuesta23: '',
    respuesta24: '',
    pregunta3: '',
    respuesta31: '',
    respuesta32: '',
    respuesta33: '',
    respuesta34: '',
    pregunta4: '',
    respuesta41: '',
    respuesta42: '',
    respuesta43: '',
    respuesta44: '',
    pregunta5: '',
    respuesta51: '',
    respuesta52: '',
    respuesta53: '',
    respuesta54: '',
    pregunta6: '',
    respuesta61: '',
    respuesta62: '',
    respuesta63: '',
    respuesta64: '',
    pregunta7: '',
    respuesta71: '',
    respuesta72: '',
    respuesta73: '',
    respuesta74: '',
    pregunta8: '',
    respuesta81: '',
    respuesta82: '',
    respuesta83: '',
    respuesta84: '',
    pregunta9: '',
    respuesta91: '',
    respuesta92: '',
    respuesta93: '',
    respuesta94: '',
    pregunta10: '',
    respuesta101: '',
    respuesta102: '',
    respuesta103: '',
    respuesta104: '',
  };

  constructor(private cuestionarioService: CuestionarioService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerCuestionarios();
  }

  obtenerCuestionarios(): void {
    this.cuestionarioService.obtenerTodosLosCuestionarios().subscribe(
      cuestionarios => {
        this.cuestionarios = cuestionarios;
      },
      error => {
        console.error('Error al obtener los cuestionarios:', error);
      }
    );
  }

  crearCuestionario(): void {
    this.cuestionarioService.crearCuestionario(this.nuevoCuestionario).subscribe(
      cuestionario => {
        console.log('Cuestionario creado:', cuestionario);
        Swal.fire({
          title: 'Cuestionario creado',
          text: 'El cuestionario ha sido creado exitosamente.',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
          timer: 3000,
          timerProgressBar: true,
        });
        // Refrescar la lista de cuestionarios después de crear uno
        this.obtenerCuestionarios();
      },
      error => {
        console.error('Error al crear el cuestionario:', error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al crear el cuestionario.',
          icon: 'error',
          showCancelButton: false
        });
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