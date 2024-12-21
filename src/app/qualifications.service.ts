import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QualificationsService {
  private apiUrl = '/api/qualifications';

  constructor(private http: HttpClient) { }

  getQualifications(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addQualification(qualification: any): Observable<any> {
    return this.http.post(this.apiUrl, qualification);
  }

  deleteQualification(qualificationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${qualificationId}`);
  }
}