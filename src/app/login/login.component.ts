import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private router: Router, private http: HttpClient) { }

  login(): void {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post('/api/login', loginData).subscribe(
      (response: any) => {
        console.log('Logged in successfully', response);
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/my-account']);
      },
      (error: any) => {
        console.error('Error logging in', error);
        this.loginError = true;
      }
    );
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}