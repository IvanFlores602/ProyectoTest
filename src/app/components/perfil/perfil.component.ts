import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Servicies/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: any;
  id: any;
  tespId: any;
  testId: any;
  usuarioData= {
    idUsuario: 0 ,
    nombre: '',
    apellido: '',
    correoElectronico: '',
    telefono: 0,
    ocupacion: '',
    contrasena: '',
    edad: 0,
    genero: '',
    tespList: [
      {
        nombreTest: '',
        puntaje: '',
        descripcion: ''
      }
    ],
    testList: [
      {
        nombreTest: '',
        puntaje: '',
        descripcion: ''
      }
    ]
  };
  
  constructor(private usuarioService:UsuarioService, private router: Router) { 
    this.id = localStorage.getItem('idUsuario');
    this.tespId = localStorage.getItem('id')
    this.testId = localStorage.getItem('id')
  }

  ngOnInit(): void {
    this.obtenerUsuarioPorId();
  }

  obtenerUsuarioPorId(){
      this.usuarioService.obtenerUsuarioPorId(this.id).subscribe(
        usuario => {
          this.usuario = usuario
          console.log(this.usuario)
          this.usuarioData.nombre = this.usuario.nombre,
          this.usuarioData.apellido = this.usuario.apellido,
          this.usuarioData.correoElectronico = this.usuario.correoElectronico,
          this.usuarioData.contrasena = this.usuario.contrasena,
          this.usuarioData.edad = this.usuario.edad,
          this.usuarioData.telefono =this.usuario.telefono,
          this.usuarioData.genero = this.usuario.genero,
          this.usuarioData.ocupacion = this.usuario.ocupacion
      
        },
        error =>{
          console.log(error);
        }
      )
  }

  modificarUsuario(): void {
    // Comprobar si hay cambios en los datos antes de hacer la llamada al servicio
    const datosModificados = this.hayCambiosEnDatos();
  
    if (!datosModificados) {
      // No hay cambios, mostrar un mensaje al usuario
      Swal.fire('Sin cambios', 'No has realizado ningún cambio en tus datos.', 'info');
      return;
    }
  
    // Mostrar cuadro de confirmación
    Swal.fire({
      title: 'Cambiar Información',
      text: '¿Estás seguro de que deseas cambiar tus datos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma el cambio, se procede a actualizar los datos
        this.usuarioService.actualizarUsuario(this.id, this.usuarioData).subscribe(
          usuario => {
            this.usuario = usuario;
            console.log(this.usuario);
            Swal.fire('¡Datos actualizados!', 'Tus datos han sido actualizados correctamente.', 'success');
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
  // Función para comprobar si hay cambios en los datos
hayCambiosEnDatos(): boolean {
  return (
    this.usuarioData.nombre !== this.usuario.nombre ||
    this.usuarioData.apellido !== this.usuario.apellido ||
    this.usuarioData.correoElectronico !== this.usuario.correoElectronico ||
    this.usuarioData.contrasena !== this.usuario.contrasena ||
    this.usuarioData.edad !== this.usuario.edad ||
    this.usuarioData.telefono !== this.usuario.telefono ||
    this.usuarioData.genero !== this.usuario.genero ||
    this.usuarioData.ocupacion !== this.usuario.ocupacion ||
    // Compara los datos de tespList y testList, por ejemplo, si es un array de objetos:
    JSON.stringify(this.usuarioData.tespList) !== JSON.stringify(this.usuario.tespList) ||
    JSON.stringify(this.usuarioData.testList) !== JSON.stringify(this.usuario.testList)
  );
}
  



// ...

borrarTest(id: number) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Una vez eliminado, no podrás recuperar este test.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.usuarioService.eliminarTest(this.id, id).subscribe(
        () => {
          console.log('Test eliminado correctamente.');
          Swal.fire({
            title: '¡Test eliminado!',
            text: 'El test ha sido eliminado exitosamente.',
            icon: 'success',
            showCancelButton: false
          }).then(() => {
            // Recargar la página después de eliminar el test
            location.reload();
          });
        },
        error => {
          console.error('Error al eliminar el test:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al eliminar el test. Por favor, inténtalo nuevamente.',
            icon: 'error',
            showCancelButton: false
          });
        }
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // El usuario canceló el borrado, no hacer nada.
    }
  });
}



borrarTestP( id: number) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Una vez eliminado, no podrás recuperar este test.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
  this.usuarioService.eliminarTestP(this.id, id).subscribe(
    () => {
      console.log('Test eliminado correctamente.');
      Swal.fire({
        title: '¡Test eliminado!',
        text: 'El test ha sido eliminado exitosamente.',
        icon: 'success',
        showCancelButton: false
      }).then(() => {
        // Recargar la página después de eliminar el test
        location.reload();
      });
    },
    error => {
      console.error('Error al eliminar el test:', error);
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al eliminar el test. Por favor, inténtalo nuevamente.',
        icon: 'error',
        showCancelButton: false
      });
    }
  );
} else if (result.dismiss === Swal.DismissReason.cancel) {
  // El usuario canceló el borrado, no hacer nada.
}
});
}
  //Subir Archivos
onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  this.uploadFile(file);
}

async uploadFile(file: File): Promise<void> {
  try {
     // Aquí debes proporcionar el ID del usuario actual
    const response = await this.usuarioService.uploadFile(this.id, file);
    console.log('Archivo subido:', response);
  } catch (error) {
    console.error('Error al subir el archivo:', error);
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
