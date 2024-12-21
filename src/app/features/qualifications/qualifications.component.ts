import { Component, OnInit } from '@angular/core';
import { QualificationsService } from '../../qualifications.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-qualifications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.css']
})
export class QualificationsComponent implements OnInit {
  qualifications: any[] = [];
  newQualification: any = {};

  constructor(private qualificationsService: QualificationsService) { }

  ngOnInit(): void {
    this.loadQualifications();
  }

  loadQualifications(): void {
    this.qualificationsService.getQualifications().subscribe(data => {
      this.qualifications = data;
    });
  }

  addQualification(): void {
    this.qualificationsService.addQualification(this.newQualification).subscribe(() => {
      this.loadQualifications();
      this.newQualification = {};
    });
  }

  deleteQualification(qualificationId: number): void {
    this.qualificationsService.deleteQualification(qualificationId).subscribe(() => {
      this.loadQualifications();
    });
  }
}