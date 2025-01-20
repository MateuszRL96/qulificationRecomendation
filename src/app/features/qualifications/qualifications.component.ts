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
  searchTerm: string = '';
  searchBySkill: boolean = false;
  isEditing = false;
  editingQualificationId: number | null = null;

  constructor(private qualificationsService: QualificationsService, private router: Router) { }

  ngOnInit(): void {
    this.loadQualifications();
  }

  loadQualifications(): void {
    this.qualificationsService.getQualifications().subscribe(data => {
      this.qualifications = data;
      this.qualifications.forEach(q => {
        q.isStarred = false;
        q.level = '';
      });
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

  searchByName(): void {
    // Implement search by name logic here
    console.log('Searching by name:', this.searchTerm);
  }

  toggleSearchMode(): void {
    this.searchBySkill = !this.searchBySkill;
    if (this.searchBySkill) {
      // Implement logic to switch to search by skill
      console.log('Switched to search by skill');
    } else {
      // Implement logic to switch to search by name
      console.log('Switched to search by name');
    }
  }

  toggleStar(qualification: any): void {
    qualification.isStarred = !qualification.isStarred;
    if (!qualification.isStarred) {
      qualification.level = '';
    }
  }

  addQualificationToUser(qualification: any): void {
    if (!qualification.level) {
      qualification.errorMessage = 'Wybierz poziom znajomości';
      return;
    }
    qualification.errorMessage = '';
    qualification.userId = this.getCurrentUserId(); // Upewnij się, że ta metoda zwraca ID aktualnego użytkownika
    this.qualificationsService.addUserQualification(qualification).subscribe(response => {
      console.log('Qualification added to user:', response);
    }, error => {
      console.error('Error adding qualification to user:', error);
    });
  }

  getCurrentUserId(): number {
    return 1; // Przykładowe ID użytkownika, zamień na rzeczywistą logikę
  }
}
