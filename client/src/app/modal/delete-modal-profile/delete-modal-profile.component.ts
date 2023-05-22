import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-delete-modal-profile',
  templateUrl: './delete-modal-profile.component.html',
  styleUrls: ['./delete-modal-profile.component.css']
})
export class DeleteModalProfileComponent implements OnInit {
  user2Delete: any;

  constructor(
    public dialogRef: MatDialogRef<DeleteModalProfileComponent>,
    private userService: UsersService,
    private router: Router,
    private toast: NgToastService,

  ) { }

  ngOnInit(): void {
    this.user2Delete = this.userService.user2Delete;
  }

  DeleteUser() {
    console.log(this.user2Delete);
    this.userService.deleteUser(this.user2Delete, (err: any, data: any) => {
      if (err) {
        console.log('Error: ', err);
      }
      else {
        console.log('User successfully deleted: ', data);
        this.router.navigate(['/login']);
        this.toast.warning({detail:'alert',summary:'User Deleted', sticky:true,position:'tr'})
      }
    })
  }
}