import { Component, OnInit } from '@angular/core';
import { RecommendationsService } from '../../recommendations.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recomentations.component.html',
  styleUrls: ['./recomentations.component.css']
})
export class RecommendationsComponent implements OnInit {
  recommendations: any[] = [];
  userQualifications: any[] = [];
  jobQualifications: any[] = [];
  newRecommendation: any = {};
  userId: number = 1; // Standard user ID
  recommendedJob: string | null = null;
  showCareerPath: boolean = false;

  constructor(private recommendationsService: RecommendationsService, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.loadRecommendations();
    this.loadUserQualifications();
  }

  loadRecommendations(): void {
    this.recommendationsService.getRecommendations().subscribe(data => {
      this.recommendations = data;
    });
  }

  loadUserQualifications(): void {
    this.recommendationsService.getUserQualifications(this.userId).subscribe(data => {
      this.userQualifications = data;
    });
  }

  addRecommendation(): void {
    this.recommendationsService.addRecommendation(this.newRecommendation).subscribe(() => {
      this.loadRecommendations();
      this.newRecommendation = {};
    });
  }

  deleteRecommendation(recommendationId: number): void {
    this.recommendationsService.deleteRecommendation(recommendationId).subscribe(() => {
      this.loadRecommendations();
    });
  }

  createProfessionalRecommendation(): void {
    this.http.get('http://localhost:8080/data-preparation/user/1/profession', {responseType: 'text'})
      .subscribe((job: string) => {
        this.recommendedJob = job;
      }, (error) => {
        console.error('Error fetching recommendation', error);
      });
  }

  deleteQualification(qualificationId: number): void {
    this.http.get<any[]>('http://localhost:8080/api/user-qualifications/all')
      .subscribe((data) => {
        const qualification = data.find(q => q.user_id === 1 && q.id === qualificationId);
        if (qualification) {
          this.http.delete(`http://localhost:8080/api/user-qualifications/delete/${qualification.qualification_id}`)
            .subscribe(() => {
              console.log(`Qualification with qualification_id: ${qualification.qualification_id} deleted successfully`);
              this.loadUserQualifications();
            }, (error) => {
              console.error('Error deleting qualification', error);
            });
        } else {
          console.error('Qualification not found');
        }
      }, (error) => {
        console.error('Error fetching qualifications', error);
      });
  }

  mapLevel(level: number): string {
    switch (level) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Intermediate';
      case 3:
        return 'Expert';
      default:
        return 'Unknown';
    }
  }

  checkImprovements(): void {
    this.showCareerPath = true;
    if (this.recommendedJob) {
      console.log(`Fetching qualifications for job: ${this.recommendedJob}`);
      this.http.get<any[]>(`http://localhost:4200/api/qualifications/profession/${this.recommendedJob}`)
        .subscribe(data => {
          console.log(`Endpoint: http://localhost:4200/api/qualifications/profession/${this.recommendedJob}`);
          this.jobQualifications = data.map(item => {
            const userQualification = this.userQualifications.find(q => q.name === item[0]);
            const match = userQualification ? (userQualification.level === parseInt(item[1], 10) ? 'exact' : 'partial') : 'none';
            return {name: item[0], level: parseInt(item[1], 10), match};
          });
        }, (error) => {
          console.error('Error fetching job qualifications', error);
        });
    }
  }

  refreshPage(): void {
    window.location.reload();
  }
}
