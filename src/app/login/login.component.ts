import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginWithGoogle(): void {
    window.location.href = 'http://localhost:8080/auth/google';
  }

  loginWithGitHub(): void {
    window.location.href = 'http://localhost:8080/auth/github';
  }
}
