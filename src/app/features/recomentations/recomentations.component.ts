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
  newRecommendation: any = {};

  constructor(private recommendationsService: RecommendationsService) { }

  ngOnInit(): void {
    this.loadRecommendations();
  }

  loadRecommendations(): void {
    this.recommendationsService.getRecommendations().subscribe(data => {
      this.recommendations = data;
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
}