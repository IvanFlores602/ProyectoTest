import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../Models/Usuario'; 
import { UsuarioService } from '../../Servicies/usuario.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Test } from 'src/app/Models/Test';
import { Tesp } from 'src/app/Models/Tesp';

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

  constructor(private UsuarioService: UsuarioService) { 
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



borrarTestP(idUsuario: number, id: number) {
  this.UsuarioService.eliminarTestP(idUsuario, id).subscribe(
    () => {
      console.log('Test eliminado correctamente.');
      Swal.fire({
        title: '¡Test Eliminado!',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
        timer: 3000,
        timerProgressBar: true,
      });
    },
    error => {
      console.error('Error al eliminar el test:', error);
      Swal.fire({
        title: 'Error',
        text: 'Paso un error al eliminar el Usuario.',
        icon: 'error',
        showCancelButton: false
      });
    }
  );
}


borrarTest( id: number) {
  this.UsuarioService.eliminarTest(this.id, id).subscribe(
    () => {
      console.log('Test eliminado correctamente.');
      // Opcional: Puedes actualizar la lista de pruebas en la vista si lo deseas.
    },
    error => {
      console.error('Error al eliminar el test:', error);
      // Maneja el error si es necesario.
    }
  );
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
            // Realizar cualquier otra acción necesaria después de eliminar el usuario
          },
          (error) => {
            console.log('Error al eliminar el usuario:', error);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          }
        );
      }
    });
  }
  
}
