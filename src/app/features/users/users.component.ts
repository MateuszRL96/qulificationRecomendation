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

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getEmployerDetails().subscribe(data => {
      this.users = data;
    });
  }
}
