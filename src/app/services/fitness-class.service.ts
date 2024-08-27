import { Injectable } from '@angular/core';
import { FitnessClass } from '../models/fitness-class.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FitnessClassService {

  private apiUrl = 'http://localhost:8080/api/v1/classes';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('access_token');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }

  getAllClasses(): Observable<FitnessClass[]> {
    return this.http.get<FitnessClass[]>(this.apiUrl, { headers: this.getAuthHeaders(),  withCredentials: true  });
  }

  getClassById(id: number): Observable<FitnessClass> {
    return this.http.get<FitnessClass>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }




}
