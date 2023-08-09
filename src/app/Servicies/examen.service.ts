import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Examen, Pregunta, Respuesta  } from '../Models/Examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  
  private apiUrl = 'http://localhost:9090'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  // Obtener todos los exámenes
  obtenerTodosLosExamenes(): Observable<Examen[]> {
    return this.http.get<Examen[]>(`${this.apiUrl}/examenes`);
  }

  // Obtener un examen por su ID
  obtenerExamenPorId(id: number): Observable<Examen> {
    return this.http.get<Examen>(`${this.apiUrl}/examenes/${id}`);
  }

  crearExamen(examen: Examen): Observable<Examen> {
    // Simulación de asignación de preguntas al examen (lado del cliente)
    examen.preguntas.forEach((pregunta) => {
      pregunta.id = Date.now(); // Asignación temporal de IDs únicos para preguntas
    });

    // Simulación de guardado en el servidor (usando HttpClient)
    return this.http.post<Examen>(`${this.apiUrl}/examenes`, examen);
  }
  // Crear Pregunta en el servidor y sus Respuestas
crearPreguntaYRespuestas(pregunta: Pregunta): Observable<Pregunta> {
  // Enviar la pregunta al servidor para crearla
  return this.http.post<Pregunta>(`${this.apiUrl}/preguntas`, pregunta);
}
// Crear Respuesta en el servidor
crearRespuesta(respuesta: Respuesta): Observable<Respuesta> {
  // Enviar la respuesta al servidor para crearla
  return this.http.post<Respuesta>(`${this.apiUrl}/respuestas`, respuesta);
}
  guardarPregunta(pregunta: Pregunta): Observable<Pregunta> {
    return this.http.post<Pregunta>(`${this.apiUrl}/preguntas`, pregunta);
  }
  // Actualizar un examen existente
  actualizarExamen(id: number, examen: Examen): Observable<Examen> {
    return this.http.put<Examen>(`${this.apiUrl}/examenes/${id}`, examen);
  }

  // Eliminar un examen
  eliminarExamen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/examenes/${id}`);
  }

  // Obtener todas las preguntas
  obtenerTodasLasPreguntas(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(`${this.apiUrl}/preguntas`);
  }

  // Obtener una pregunta por su ID
  obtenerPreguntaPorId(id: number): Observable<Pregunta> {
    return this.http.get<Pregunta>(`${this.apiUrl}/preguntas/${id}`);
  }

  // Crear una nueva pregunta
  crearPregunta(pregunta: Pregunta): Observable<Pregunta> {
    return this.http.post<Pregunta>(`${this.apiUrl}/preguntas`, pregunta);
  }

  // Eliminar una pregunta
  eliminarPregunta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/preguntas/${id}`);
  }
  }
  

