import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe(data => {
      this.user = data;
    });
  }

  createProfile(): void {
    this.usersService.createUserProfile(this.profile).subscribe(response => {
      console.log('Profile created successfully', response);
      // Handle success, e.g., redirect or show a success message
    }, error => {
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
}
