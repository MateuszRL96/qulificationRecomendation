import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QualificationsService {
  private apiUrl = 'http://localhost:8080';

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
}