import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Models/Usuario'; 
import { UsuarioService } from '../../Servicies/usuario.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  usuario: any;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
   /// const idUsuarioActual = // Obtener el ID del usuario actual desde el almacenamiento local u otra fuente
  //this.obtenerUsuario(idUsuarioActual);
  }
  obtenerUsuario(id: number): void {
    this.usuarioService.obtenerUsuarioPorId(id).subscribe(
      (usuario) => {
        // Asignar los datos del usuario a una variable en el componente
        this.usuario = usuario;
      },
      (error) => {
        console.log('Error al obtener el usuario:', error);
      }
    );
}
}