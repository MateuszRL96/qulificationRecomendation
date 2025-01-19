import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {UsersService} from '../users.service';
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
      console.error('Error creating profile', error);
      // Handle error, e.g., show an error message
    });
  }
}
