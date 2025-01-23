import { Component, OnInit, Input } from '@angular/core';
import { CareerPathService } from '../career-path.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-career-path',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career-path.component.html',
  styleUrls: ['./career-path.component.css']
})
export class CareerPathComponent implements OnInit {
  @Input() recommendedJob?: string;
  userRecommendations: any[] = [];
  professionQualifications: any;
  userQualifications: any[] = [];
  jobQualifications: any[] = [];

  constructor(private careerPathService: CareerPathService) { }

  ngOnInit(): void {
    this.careerPathService.getUserRecommendations().subscribe(data => {
      this.userRecommendations = data;
    });

    if (this.recommendedJob) {
      console.log(`Fetching qualifications for job: ${this.recommendedJob}`);
      this.careerPathService.getProfessionQualifications(this.recommendedJob).subscribe(data => {
        console.log(`Endpoint: http://localhost:4200/api/qualifications/profession/${this.recommendedJob}`);
        this.jobQualifications = data;
      });
    }

    this.loadUserQualifications();
  }

  loadUserQualifications(): void {
    this.careerPathService.getUserQualifications(1).subscribe(data => {
      this.userQualifications = data;
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
}
