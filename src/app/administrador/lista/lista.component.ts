import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../Models/Usuario'; 
import { UsuarioService } from '../../Servicies/usuario.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Test } from 'src/app/Models/Test';
import { Tesp } from 'src/app/Models/Tesp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  @ViewChild('myForm') form1: any;
  idUsuario: number | undefined
  usuario: any;
  id: any;
  tespId: any;
  testId: any;
  usuarioData= {
    idUsuario: 0,
    nombre : '',
    apellido: '',
    correoElectronico: '',
    telefono: 0,
    ocupacion: '',
    contrasena: '',
    edad:0,
    genero: ''
  }
  tespList= {
      nombreTest:'',
      puntaje:'',
      descripcion:''
    }
    testList= {
      nombreTest:'',
      puntaje:'',
      descripcion:''

    }
  usuarios: Usuario[] = [];
  tests: Test[] = [];
  tesps: Tesp[] = [];

  constructor(private UsuarioService: UsuarioService, private router: Router) { 
    this.id = localStorage.getItem('idUusario')
    this.tespId = localStorage.getItem('id')
    this.testId = localStorage.getItem('id')
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
   
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
 
  modificarUsuario(): void {
    if (this.usuarioSeleccionado) {
      this.usuarioData.idUsuario = this.usuarioSeleccionado.idUsuario;
      this.UsuarioService.actualizarUsuario(this.usuarioData.idUsuario, this.usuarioData).subscribe(
        usuarioActualizado => {
          this.usuarioSeleccionado = usuarioActualizado;
          console.log(this.usuarioSeleccionado);
          Swal.fire({
            title: 'Cambiar Información',
            text: '¿Estás seguro de que deseas cambiar los datos?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
              this.form1.reset();
            }
          });
          // Recargar la página después de eliminar el test
          window.location.reload();
        },
        error => {
          console.error('Error al modificar el usuario:', error);
          Swal.fire('Error', 'Ocurrió un error al modificar el usuario.', 'error');
        }
      );
    }
  }
  
  
usuarioSeleccionado: Usuario | undefined;
cargarUsuario(idUsuario: number): void {
  this.idUsuario = idUsuario;
  this.UsuarioService.obtenerUsuarioPorId(idUsuario).subscribe(
    usuario => {
      this.usuarioSeleccionado = usuario;
      this.usuarioData = { ...usuario };

      // Llamada al servicio para obtener los tesp del usuario
      this.UsuarioService.obtenerTespPorUsuarioId(idUsuario).subscribe(
        (tesps) => {
          this.tesps = tesps;
        },
        (error) => {
          console.error('Error al obtener los tesp:', error);
        }
      );
        // Llamada al servicio para obtener los tests del usuario
        this.UsuarioService.obtenerTestPorId(idUsuario).subscribe(
          (tests) => {
            this.tests = tests;
          },
          (error) => {
            console.error('Error al obtener los tests:', error);
          }
        );
      

    },
    error => {
      console.error('Error al obtener el usuario:', error);
    }
  );
}



borrarTestP(tesp: any, idUsuario: number) {
  if (tesp?.id) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el tesp. ¿Estás seguro de continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.UsuarioService.eliminarTestP(this.usuarioData.idUsuario, tesp.id).subscribe(
          () => {
            console.log('Test eliminado correctamente.');
            Swal.fire({
              title: '¡Test Eliminado!',
              text: 'El tesp ha sido eliminado correctamente.',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Aceptar',
              timer: 3000,
              timerProgressBar: true,
            });
            // Recargar la página después de eliminar el test
            window.location.reload();
          },
          error => {
            console.error('Error al eliminar el test:', error);
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al eliminar el test.',
              icon: 'error',
              showCancelButton: false
            });
          }
        );
      }
    });
  } else {
    console.error('El objeto tesp o su propiedad id es indefinido.');
  }
}

borrarTestt(test: any, idUsuario: number) {
  if (test?.id) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el tesp. ¿Estás seguro de continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.UsuarioService.eliminarTest(this.usuarioData.idUsuario, test.id).subscribe(
          () => {
            console.log('Test eliminado correctamente.');
            Swal.fire({
              title: '¡Test Eliminado!',
              text: 'El tesp ha sido eliminado correctamente.',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Aceptar',
              timer: 3000,
              timerProgressBar: true,
            });
            // Recargar la página después de eliminar el test
            window.location.reload();
          },
          error => {
            console.error('Error al eliminar el test:', error);
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al eliminar el test.',
              icon: 'error',
              showCancelButton: false
            });
          }
        );
      }
    });
  } else {
    console.error('El objeto tesp o su propiedad id es indefinido.');
  }
}

  eliminarUsuario(idUsuario: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El usuario se eliminará permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.UsuarioService.eliminarUsuario(idUsuario).subscribe(
          () => {
            Swal.fire('Usuario eliminado', 'El usuario se ha eliminado correctamente.', 'success');
            // Recargar la página después de eliminar el test
            window.location.reload();
          },
          (error) => {
            console.log('Error al eliminar el usuario:', error);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          }
        );
      }
    });
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
