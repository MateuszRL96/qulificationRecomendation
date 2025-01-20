import { Component, OnInit } from '@angular/core';
import { RecommendationsService } from '../../recommendations.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  newRecommendation: any = {};
  userId: number = 1; // Standard user ID

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

  constructor(private recommendationsService: RecommendationsService) { }

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
    // Logic to create a professional recommendation
    console.log('Professional recommendation created');
  }
}
