import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = '/api';
  private createProfileApiUrl = 'http://localhost:8080/api/user-details/add'; // Updated API URL for create profile

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUsers(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addUser(user: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, user, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${userId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentUser(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/user`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  createUserProfile(profile: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.createProfileApiUrl, profile, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => error); // Rethrow the error
  }
}
