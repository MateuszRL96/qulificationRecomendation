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
  newUser = { name: '', email: '', isAdmin: false };

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  addUser() {
    const userToAdd = {
      name: this.newUser.name,
      email: this.newUser.email,
      role: this.newUser.isAdmin ? 'admin' : 'user'
    };

    this.usersService.addUser(userToAdd).subscribe(user => {
      this.users.push(user);
      this.newUser = { name: '', email: '', isAdmin: false };
    });
  }

  deleteUser(userId: number): void {
    this.usersService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }
}