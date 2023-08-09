import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuestionario } from '../Models/Cuestionario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  private baseUrl = 'http://localhost:9090/cuestionarios';

  constructor(private http: HttpClient) { }

  crearCuestionario(cuestionario: Cuestionario): Observable<Cuestionario> {
    return this.http.post<Cuestionario>(this.baseUrl, cuestionario);
  }

  obtenerCuestionarioPorId(id: number): Observable<Cuestionario> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Cuestionario>(url);
  }
  
  buscarCuestionariosPorTitulo(titulo: string): Observable<Cuestionario[]> {
    const url = `${this.baseUrl}?titulo=${titulo}`;
    return this.http.get<Cuestionario[]>(url);
  }
  obtenerTodosLosCuestionarios(): Observable<Cuestionario[]> {
    return this.http.get<Cuestionario[]>(this.baseUrl);
  }

  eliminarCuestionario(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
