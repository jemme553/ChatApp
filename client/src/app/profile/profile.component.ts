import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component'
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalProfileComponent } from '../modal/delete-modal-profile/delete-modal-profile.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  online: boolean = false;
  user: any;
  age: any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UsersService,
    private socketService: SocketService,
  ) {}

  ngOnInit(): void {
    this.user = this.userService.prouser;
    this.online = this.userService.online;
    console.log(this.user);
    let dt = new Date(this.user.age);
    let timeDiff = Math.abs(Date.now() - dt.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    console.log(age);
    this.age = age;
  }
  editUser(user: any) {
    if(user.role === 'admin') {
      this.userService.isAdmin = true;
    }
    this.userService.user2Edit = user;
    this.router.navigate(['/edituser']);
  }

  deleteAccount(user: any) {
    console.log('first user: ', user);
    this.userService.user2Delete = user;
    let enterAnimationDuration = '0ms';
    let exitAnimationDuration = '0ms';
    this.dialog.open(DeleteModalProfileComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
