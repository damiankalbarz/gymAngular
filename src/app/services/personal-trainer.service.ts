import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PersonalTrainer } from '../models/personal-trainer.model';




@Injectable({
  providedIn: 'root'
})
export class PersonalTrainerService {
   private apiUrl = '/api/v1/personal-trainer';


  constructor(private http: HttpClient) { }

  getPersonalTrainers(): Observable<PersonalTrainer[]> {
    return this.http.get<PersonalTrainer[]>(this.apiUrl);
  }

  getPersonalTrainerById(id: number): Observable<PersonalTrainer> {
    return this.http.get<PersonalTrainer>(`${this.apiUrl}/${id}`);
  }
}
