import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface Authentication {
  access_token: string;
  refresh_token: string;
}

interface Register {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/v1/auth'; // Backend API URL

  constructor(private http: HttpClient) {}

  register(request: Register): Observable<Authentication> {
    return this.http.post<Authentication>(`${this.API_URL}/register`, request, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(response => this.handleAuthentication(response)),
      catchError(this.handleError)
    );
  }

  login(request: Login): Observable<Authentication> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Authentication>(`${this.API_URL}/authenticate`, request, { headers }).pipe(
      tap(response => this.handleAuthentication(response)),
      catchError(this.handleError)
    );
  }

  refreshToken(refreshToken: string): Observable<Authentication> {
    return this.http.post<Authentication>(`${this.API_URL}/refresh-token`, { refresh_token: refreshToken }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(response => this.handleAuthentication(response)),
      catchError(this.handleError)
    );
  }

  private handleAuthentication(response: Authentication) {
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  verifyGoogleToken(idToken: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/google-authenticate`, { id_token: idToken }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(this.handleError)
    );
  }
}
