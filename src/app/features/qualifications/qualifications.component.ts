import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QualificationsService } from '../../qualifications.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

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
  successMessage: string = '';

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
    const searchTerm = this.searchTerm.trim();
    if (!searchTerm) {
      this.loadQualifications();
      return;
    }

    this.qualificationsService.searchQualificationsByName(searchTerm).subscribe((ids) => {
      if (ids.length > 0) {
        const qualificationsObservables = ids.map(id => this.qualificationsService.getQualificationDetails(id));
        forkJoin(qualificationsObservables).subscribe((data) => {
          this.qualifications = data;
        }, (error) => {
          console.error('Error fetching qualification details', error);
        });
      } else {
        this.qualifications = [];
      }
    }, (error) => {
      console.error('Error searching qualifications', error);
    });
  }

  toggleSearchMode(): void {
    this.searchBySkill = !this.searchBySkill;
    if (this.searchBySkill) {
      console.log('Switched to search by skill');
    } else {
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
    qualification.userId = this.getCurrentUserId();
    this.qualificationsService.addUserQualification(qualification).subscribe(response => {
      console.log('Qualification added to user:', response);
      this.successMessage = `Kwalifikacja ${qualification.name} została dodana do panelu rekomendacji.`;
      this.qualifications = this.qualifications.filter(q => q.id !== qualification.id);
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }, error => {
      console.error('Error adding qualification to user:', error);
    });
  }

  getCurrentUserId(): number {
    return 1;
  }
}
