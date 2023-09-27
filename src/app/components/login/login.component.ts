import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../Servicies/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router, private usuarioService: UsuarioService) { }

  registerData = {
    correoElectronico: '',
    contrasena: '',

  };

  user:any;
  usuario: any;
  
  iniciarSesion(): void {
    console.log(this.registerData)
    this.usuarioService.login(this.registerData).subscribe(
      (respuesta) => {
        if (respuesta.status) {
          console.log('Inicio de sesión exitoso');
          this.user = respuesta.usuario;
          localStorage.setItem('idUsuario', this.user.idUsuario.toString())
          console.log('Usuario:', this.user);
          Swal.fire({
            title: '¡Credenciales correctas!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            timer: 3000,
            timerProgressBar: true,
          }).then(() => {
            if (this.user.correoElectronico.toLowerCase() === 'admin@gmail.com') {
              this.router.navigate(['/listas']).then(() => {
                window.location.reload();
              });
            } else {
              this.router.navigate(['/inicio']).then(() => {
                window.location.reload();
              });
            }
          });

        } else {
          console.log('Credenciales inválidas');
          Swal.fire({
            title: '¡Credenciales incorrectas!',
            text: 'Por favor, verifica tus credenciales e intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      (error) => {
        console.log('Error:', error);
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

  ngOnInit(): void {
  }
  
}