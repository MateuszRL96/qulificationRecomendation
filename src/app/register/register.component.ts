import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  age: number | null = null;
  address: string = '';
  registrationSuccess: boolean = false;

  constructor(private router: Router, private http: HttpClient) { }

  register(): void {
    const userDetails = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      age: this.age,
      address: this.address
    };

    this.http.post('/register', userDetails).subscribe(
      (response: any) => {
        console.log('User registered successfully', response);
        localStorage.setItem('user', JSON.stringify(response));
        this.registrationSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/my-account']);
        }, 2000); // Przekierowanie po 2 sekundach
      },
      (error: any) => {
        console.error('Error registering user', error);
      }
    );
  }
}