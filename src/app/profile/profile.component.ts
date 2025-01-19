import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  template: `
    <div *ngIf="auth.user$ | async as user">
      <h2>{{ user.name }}</h2>
      <pre>{{ user | json }}</pre>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
