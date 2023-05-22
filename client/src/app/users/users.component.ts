import { Component, OnInit } from '@angular/core';
import { User } from '../app.component';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component'
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component'
import { NgToastService } from 'ng-angular-popup';
import { SocketService } from '../services/socket.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  user: any;
  isAdmin: boolean = true;
  age: any;
  onlineUsers: any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UsersService,
    private toast: NgToastService,
    private socketService: SocketService,
  ) {
    this.userService.getUsers(() => { })
    this.userService.newUsersArrived.subscribe(() => {
      this.users = this.userService.users;
      console.log(this.users);
    });
  }

  ngOnInit(): void {
    this.user = this.userService.prouser;

    if (this.user.role !== 'admin') {
      this.isAdmin = false
    } else {
      this.isAdmin = true;
    }
    this.userService.getUsers(() => { })
    this.userService.newUsersArrived.subscribe(() => {
      this.users = this.userService.users;
      console.log(this.users);
    });

  }

  editUser(user: any) {
    if (this.user.role === 'admin') {
      this.userService.isAdmin = true;
    }
    this.userService.user2Edit = user;
    let enterAnimationDuration = '0ms';
    let exitAnimationDuration = '0ms';
    this.dialog.open(ModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

  }

  deleteUser(user: any) {
    this.userService.user2Delete = user;
    let enterAnimationDuration = '0ms';
    let exitAnimationDuration = '0ms';
    this.dialog.open(DeleteModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    this.userService.userDeleted.subscribe(res => {
      this.ngOnInit();
      this.toast.warning({ detail: 'alert', summary: 'User Deleted', sticky: true, position: 'tr' })
    })
  }


}