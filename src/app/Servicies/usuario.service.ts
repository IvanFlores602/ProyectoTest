import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Usuario } from '../Models/Usuario';
import { Tesp } from '../Models/Tesp';
import { Test } from '../Models/Test';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  [x: string]: any;


  private url = 'http://localhost:9090/usuarios';

  constructor(private http: HttpClient) { }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario);
  }
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  } 
  modificarUsuario(id: any, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, usuario);
  }
  actualizarUsuario(id: number, usuarioActualizado: Usuario): Observable<Usuario> {
    const url = `${this.url}/${id}`;
    return this.http.put<Usuario>(url, usuarioActualizado);
  }
  eliminarUsuario(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
  obtenerUsuarioPorId(id: any): Observable<Usuario> {
    
    return this.http.get<any>(`${this.url}/${id}`);
  }
//TEST TECNICO FUNCIOES DE SERVICIO
guardarFormularioT(usuarioId: number, nombreTest: string, puntaje: number, descripcion: string): Observable<any> {
  const url = `${this.url}/${usuarioId}/tests`;
  const formularioData = {
    nombreTest: nombreTest,
    puntaje: puntaje,
    descripcion: descripcion
  };
  return this.http.post(url, formularioData);
}
obtenerTestPorIds(usuarioId: number, id: number): Observable<Test> {
  const url = `${this.url}/${id}/test`;
  return this.http.get<Test>(url);
}
  obtenerTestPorId(usuarioId: number): Observable<Test[]> {
    const url = `${this.url}/${usuarioId}/tests`;
    return this.http.get<Test[]>(url);
  }
//obtenerTespPorUsuarioId(usuarioId: number): Observable<Tesp[]> {
 // const url = `${this.url}/${usuarioId}/tesp`;
 // return this.http.get<Tesp[]>(url);
//}

eliminarTest(usuarioId: number,id: number): Observable<void> {
  const url = `${this.url}/${usuarioId}/test/${id}`;
  return this.http.delete<void>(url);
}
//Test de PSICOMETRICO FUNCIONES DE SERVICIO
  //crear firmulario

  //se guarda el formulario si el usuario lo realiza
  asignarFormularioAUsuario(id: number, formularioData: any): Observable<void> {
    const url = `${this.url}/${id}/tesp`;
    return this.http.post<void>(url, formularioData);
  }
  guardarFormulario(usuarioId: number, nombreTest: string, puntaje: number, descripcion: string): Observable<any> {
  const url = `${this.url}/${usuarioId}/tesp`;
  const formularioData = {
    nombreTest: nombreTest,
    puntaje: puntaje,
    descripcion: descripcion
  };
  return this.http.post(url, formularioData);
}
  eliminarTestP(usuarioId: number,id: number): Observable<void> {
    const url = `${this.url}/${usuarioId}/tesp/${id}`;
    return this.http.delete<void>(url);
  }  
   
  // APARTADO DE LOS TEST
  obtenerTespPorUsuarioId(usuarioId: number): Observable<Tesp[]> {
    const url = `${this.url}/${usuarioId}/tesp`;
    return this.http.get<Tesp[]>(url);
  }
  
  async uploadFile(usuarioId: number, file: File): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('archivo', file);

    return this.http.post<any>(`${this.url}/${usuarioId}/archivos`, formData).toPromise();
  }
 //LOGIN SESION
  login(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, usuario);
  }
}
