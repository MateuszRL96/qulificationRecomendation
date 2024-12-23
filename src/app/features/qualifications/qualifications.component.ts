import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  newQualification = { name: '', description: '' };
  isEditing = false;
  editingQualificationId: number | null = null;

  constructor(private qualificationsService: QualificationsService, private router: Router) { }

  ngOnInit(): void {
    this.loadQualifications();
  }

  loadQualifications(): void {
    this.qualificationsService.getQualifications().subscribe(data => {
      this.qualifications = data;
    });
  }

  addQualification() {
    this.qualificationsService.addQualification(this.newQualification).subscribe(qualification => {
      this.qualifications.push(qualification);
      this.newQualification = { name: '', description: '' };
    });
  }

  deleteQualification(qualificationId: number): void {
    this.qualificationsService.deleteQualification(qualificationId).subscribe(() => {
      this.loadQualifications();
    });
  }

  showDetails(qualificationId: number): void {
    this.router.navigate([`/qualifications/${qualificationId}/skills`]);
  }

  editQualification(qualification: any): void {
    this.isEditing = true;
    this.editingQualificationId = qualification.id;
    this.newQualification = { name: qualification.name, description: qualification.description };
  }

  updateQualification(): void {
    if (this.editingQualificationId !== null) {
      this.qualificationsService.updateQualification(this.editingQualificationId, this.newQualification).subscribe(() => {
        this.loadQualifications();
        this.cancelEdit();
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingQualificationId = null;
    this.newQualification = { name: '', description: '' };
  }
}