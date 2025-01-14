import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-qualification-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qualification-form.component.html',
  styleUrls: ['./qualification-form.component.css']
})
export class QualificationFormComponent {
  qualificationId: number | null = null;
  level: string = '';

  constructor(private http: HttpClient) {}

  submit(): void {
    const qualificationData = {
      qualificationId: this.qualificationId,
      level: this.level
    };

    this.http.post('/profile/qualifications', qualificationData).subscribe(
      (response: any) => {
        console.log('Qualification added/updated successfully', response);
      },
      (error: any) => {
        console.error('Error adding/updating qualification', error);
      }
    );
  }
}