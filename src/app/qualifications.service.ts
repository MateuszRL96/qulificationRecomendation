import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QualificationsService {
  private api2Url = 'http://localhost:8080';
  private apiUrl = 'api';
  private secondApiUrl = 'http://localhost:8080/api/user-qualifications/add';

  constructor(private http: HttpClient) { }

  getQualifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/qualifications`);
  }

  addQualification(qualification: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/qualifications`, qualification);
  }

  deleteQualification(qualificationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/qualifications/${qualificationId}`);
  }

  updateQualification(id: number, qualification: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/qualifications/${id}`, qualification);
  }

  getQualificationDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/qualifications/${id}/skills`);
  }

  // Method using the second API URL
  addUserQualification(qualification: any): Observable<any> {
    const payload = {
      userId: 1,
      qualificationId: qualification.id,
      level: qualification.level
    };
    return this.http.post<any>(this.secondApiUrl, payload);
  }

  // New method to search qualifications by name
  searchQualificationsByName(name: string): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/qualifications/search?name=${name}`);
  }

  // New method to fetch qualification by ID
  fetchQualificationById(id: number): Observable<number> {
    return of(id);
  }
}
