import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  newUser: any = {};

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  addUser(): void {
    this.usersService.addUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.newUser = {};
    });
  }

  deleteUser(userId: number): void {
    this.usersService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }
}