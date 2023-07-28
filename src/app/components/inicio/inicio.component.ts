import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../Servicies/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  codigoAccesoCorrecto = '1q2w3e4r5t';  // Cambia el código de acceso por el que desees
  codigoIngresado: string | undefined;
  
  constructor( private UsuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }
  
  ingresarComponenteListas(): void {
    const codigoIngresado = prompt('Ingrese el código de acceso si eres ADMIN:');

    if (codigoIngresado === this.codigoAccesoCorrecto) {
      this.router.navigate(['/listas']);
    } else {
      console.log('Código de acceso incorrecto');
    }
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
