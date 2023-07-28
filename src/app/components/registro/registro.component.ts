import { Component, OnInit,ViewChild } from '@angular/core';
import { Usuario } from '../../Models/Usuario'; 
import { UsuarioService } from '../../Servicies/usuario.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as bcrypt from 'bcryptjs';
import { Route, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  @ViewChild('myForm') form1: any;

  myForma: FormGroup;

  registroData = {
    idUusario: 0,
    firstName: '',
    lastName: '',
    phone: 0,
    correo: '',
    contra: '',
    age: 0,
    genes: '',
    study: '',
  };

  usuarios: Usuario[] = [];

  constructor(private UsuarioService: UsuarioService, httpClient:HttpClient, private router:Router) {
    this.myForma = new FormGroup({
      // Otros campos del formulario
      registroTelefono: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)])
    });
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }
  
  async registrarUsuario() {

    const usuario: Usuario = {
      idUsuario:this.registroData.idUusario,
      nombre: this.registroData.firstName,
      apellido: this.registroData.lastName,
      correoElectronico: this.registroData.correo,
      contrasena: this.registroData.contra,
      genero: this.registroData.genes,
      edad: this.registroData.age,
      telefono: this.registroData.phone,
      ocupacion: this.registroData.study
      
      
    };

    this.UsuarioService.crearUsuario(usuario)
      .subscribe(
        nuevoUsuario => {
          console.log('Usuario registrado:', nuevoUsuario);
          Swal.fire({
            title: '¡Registro correcto!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            timer: 3000,  // La alerta se cerrará automáticamente después de 3 segundos
            timerProgressBar: true,
          }).then(() => {
            this.router.navigate(['/login']).then(() => {
             window.location.reload();
             this.form1.reset();
            });
          });
          
        },
        error => {
          console.error('Error al registrar usuario sin Datos:', error);
          Swal.fire({
            title: '¡ERROR Registro incorrecto!',
            text: 'Por favor, verifica que esten llenos los campos e intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      );
      
  }
  

  obtenerUsuarios() {
    this.UsuarioService.obtenerUsuarios()
      .subscribe(
        usuarios => {
          this.usuarios = usuarios;
          console.log('Usuarios obtenidos:', usuarios);
          // Realizar acciones con la respuesta recibida
        },
        error => {
          console.error('Error al obtener usuarios:', error);
          // Manejar el error
        }
      );
  }



}
