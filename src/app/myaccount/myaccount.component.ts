import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyAccountComponent implements OnInit {
  user: any;
  qualifications: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.loadQualifications();
    }
  }

  loadQualifications(): void {
    this.http.get(`/profile/qualifications?userId=${this.user.id}`).subscribe(
      (response: any) => {
        this.qualifications = response;
      },
      (error: any) => {
        console.error('Error loading qualifications', error);
      }
    );
  }

  deleteQualification(qualificationId: number): void {
    this.http.delete(`/profile/qualifications/${qualificationId}`).subscribe(
      () => {
        this.loadQualifications();
      },
      (error: any) => {
        console.error('Error deleting qualification', error);
      }
    );
  }
}