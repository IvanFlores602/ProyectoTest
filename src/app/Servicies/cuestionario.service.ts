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
    return this.http.get<Cuestionario>(`${this.baseUrl}/${id}`);
  }

  obtenerTodosLosCuestionarios(): Observable<Cuestionario[]> {
    return this.http.get<Cuestionario[]>(this.baseUrl);
  }

  eliminarCuestionario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
