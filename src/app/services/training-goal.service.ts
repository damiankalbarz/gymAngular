import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrainingGoalService {

  private apiUrl = 'http://localhost:8080/api/v1/training-goals';

  constructor() { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }




}
