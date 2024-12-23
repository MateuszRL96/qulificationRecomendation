import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QualificationsService } from '../../qualifications.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qualification-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qualification-details.component.html',
  styleUrls: ['./qualification-details.component.css']
})
export class QualificationDetailsComponent implements OnInit {
  qualification: any;

  constructor(
    private route: ActivatedRoute,
    private qualificationsService: QualificationsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.qualificationsService.getQualificationDetails(Number(id)).subscribe(data => {
      this.qualification = data;
    });
  }
}