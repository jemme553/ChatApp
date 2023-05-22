import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { UsersService } from '../services/users.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  email: string = "";
  password: string = "";

  UnAuthorized: boolean = false;
  onlineUser: any;
  onlineUsers: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private socketService: SocketService,
    private toast: NgToastService,

  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }
  ngOnInit(): void {
  }

  login() {
    localStorage.setItem('email', this.loginForm.get('email')?.value);
    localStorage.setItem('password', this.loginForm.get('password')?.value);
    console.log('email from localStorage: ', localStorage.getItem('email'));
    console.log('password from localStorage: ', localStorage.getItem('password'));

    console.log('email', this.loginForm.get('email')?.value);
    console.log('pass', this.loginForm.get('password')?.value);
    let login = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
    this.userService.login(login, (err: any, res: any) => {
      if (err) {
        this.loginForm.setValue({ email: '', password: '' });
        this.UnAuthorized = true;
        this.toast.error({ detail: 'LoggedIn Error', summary: 'Not Authorized', sticky: true, position: 'tr' })
      } else {
        this.socketService.socket.emit('userConnected', res.user);
        this.socketService.setConnectedUser(res.user);
        this.toast.success({ detail: 'LoggedIn Success', summary: 'Welcome Dear: ' + res.user.name, sticky: true, position: 'tr', duration: '3000' })
        this.router.navigate(['/profile']);

      }
    })
  }

  goTosignUp() {
    this.router.navigate(['/register']);
  }

}
