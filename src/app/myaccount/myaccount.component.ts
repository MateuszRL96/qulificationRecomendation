import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyAccountComponent implements OnInit {
  user: any;
  profile: any = {};
  showLoginForm: boolean = false;
  loginData: any = { email: '', password: '' };
  errorMessage: string = '';
  selectedFile: File | null = null;
  extractedData: any;

  constructor(private usersService: UsersService, private http: HttpClient) {}

  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe((data: any) => {
      this.user = data;
    });
  }

  createProfile(): void {
    this.usersService.createUserProfile(this.profile).subscribe((response: any) => {
      console.log('Profile created successfully', response);
      // Handle success, e.g., redirect or show a success message
    }, (error: any) => {
      if (error.status === 409) {
        this.errorMessage = 'User with this email already exists';
        this.showLoginForm = true;
      } else {
        console.error('Error creating profile', error);
        // Handle other errors, e.g., show an error message
      }
    });
  }

  login(): void {
    // Handle login logic here
    console.log('Logging in with', this.loginData);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadCv() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    } else {
      console.error('No file selected');
    }
  
    this.http.post('http://localhost:8080/api/cv/extract', formData).subscribe(
      (response) => {
        this.extractedData = response;
      },
      (error) => {
        console.error('Error uploading file', error);
      }
    );
  }

  saveData() {
    this.http.post('http://localhost:8080/api/cv/save', this.extractedData).subscribe(
      response => {
        console.log('Dane zapisane pomyślnie', response);
      },
      error => {
        console.error('Błąd podczas zapisywania danych', error);
      }
    );
  }
}