import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  private apiUrl = '/api/recommendations';
  private userQualificationsUrl = 'http://localhost:8080/api/user-qualifications/user';

  constructor(private http: HttpClient) { }

  getRecommendations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addRecommendation(recommendation: any): Observable<any> {
    return this.http.post(this.apiUrl, recommendation);
  }

  deleteRecommendation(recommendationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${recommendationId}`);
  }

  getUserQualifications(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.userQualificationsUrl}/${userId}`);
  }
}
