import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerPathService {
  private userRecommendationsUrl = 'http://localhost:8080/recommendations/user/1';
  private professionQualificationsUrl = 'http://localhost:4200/api/qualifications/profession';
  private userQualificationsUrl = 'http://localhost:8080/api/user-qualifications/user';

  constructor(private http: HttpClient) { }

  getUserRecommendations(): Observable<any> {
    return this.http.get<any>(this.userRecommendationsUrl);
  }

  getProfessionQualifications(recommendedJob: string): Observable<any> {
    return this.http.get<any>(`${this.professionQualificationsUrl}/${recommendedJob}`);
  }

  getUserQualifications(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.userQualificationsUrl}/${userId}`);
  }

  getQualificationsForJob(job: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.professionQualificationsUrl}/${job}`);
  }
}
