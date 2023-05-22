import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  user2Edit: any;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private userService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user2Edit = this.userService.user2Edit;
  }

  EditUser() {
    console.log(this.user2Edit);
    this.userService.adminEdit(this.user2Edit);
    this.router.navigate(['/edituser']);
  }


}
