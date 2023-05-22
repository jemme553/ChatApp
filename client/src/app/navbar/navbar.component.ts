import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app.component';
import { IsloggedinService } from '../auth/isloggedin.service';
import { SocketService } from '../services/socket.service';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin:boolean = false;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private isloggedin: IsloggedinService,
    private socketService: SocketService,
    private userService: UsersService,
  ) {
    this.userService.admin.subscribe((isAdmin:any)=>{
      this.isAdmin = isAdmin;
    })
  }


  loggedIn: boolean = false;
  onlineUsers: User[] = [];
  onlineUser: any;

  ngOnInit(): void {
    this.isloggedin.loginEvent.subscribe((login: any) => {
      this.loggedIn = login
    })
  }

  login() {
    this.router.navigate(['/login']);
  }

  setlogOut() {
    this.socketService.setLogoutUser();
    this.isloggedin.setLogin(false);
    this.router.navigate(['/']);
  }

  users() {
    this.router.navigate(['/users']);
  }

  chat() {
    this.router.navigate(['/chat']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }
  register() {
    this.router.navigate(['/register']);

  }
}
