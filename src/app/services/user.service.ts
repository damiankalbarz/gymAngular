import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/users';

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
     return this.http.get<User>(`${this.apiUrl}/me`, { headers: this.getAuthHeaders() });
   }

   updateUser(userData: Partial<User>): Observable<User> {
     return this.http.put<User>(`${this.apiUrl}/me`, userData);
   }

   changePassword(passwordData: { currentPassword: string, newPassword: string }): Observable<void> {
     return this.http.patch<void>(`${this.apiUrl}`, passwordData);
   }

}
