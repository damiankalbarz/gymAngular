import { Injectable } from '@angular/core';
import { MembershipPass } from '../models/membership-pass.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MembershipPassService {

  private apiUrl = 'http://localhost:8080/api/v1/membership-pass';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getAllMembershipPass(): Observable<MembershipPass[]> {
      return this.http.get<MembershipPass[]>(this.apiUrl, { headers: this.getAuthHeaders(),  withCredentials: true  });
  }

}
