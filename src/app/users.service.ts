// src/app/users.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = '/api';
  private createProfileApiUrl = 'http://localhost:8080/api'; // New API URL for create profile

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user`).pipe(
      catchError(this.handleError)
    );
  }

  createUserProfile(profile: any): Observable<any> {
    return this.http.post<any>(`${this.createProfileApiUrl}/users/create-profile`, profile).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
