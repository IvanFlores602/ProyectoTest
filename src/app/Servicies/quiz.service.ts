import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = 'http://localhost:8080/api/quizzes';

  constructor(private http: HttpClient) { }

  getQuiz(quizId: string): Observable<any> {
    const url = `${this.apiUrl}/${quizId}`;
    return this.http.get(url);
  }
  createQuiz(quizData: any): Observable<any> {
    return this.http.post(this.apiUrl, quizData);
  }

  submitAnswers(answersData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/answers`, answersData);
  }
}
