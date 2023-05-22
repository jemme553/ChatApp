import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../app.component';
import { IsloggedinService } from '../auth/isloggedin.service';
import { ServerApiService } from './server-api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private api: ServerApiService,
    private isloggedIn: IsloggedinService,
  ) { }
  online: boolean = false;
  token: string = '';
  isLoggedin: any;
  username: string = '';
  prouser: any;
  users: User[] = [];
  user: any;
  newUsersArrived = new Subject();
  isAdmin:boolean = false;
  adminEditUser:any;
  user2Edit:any;
  user2Delete:any;
  userDeleted = new Subject();
  admin = new Subject();

  login(login: any, callback: any) {
    this.api.login(JSON.stringify(login))
      .subscribe((res: any) => {
        this.isloggedIn.setToken(res.token);
        this.isloggedIn.setLogin(true);
        this.token = res.token
        this.prouser = res.user;
        this.online = true;
        if(res.user.role == 'admin') {
          this.isAdmin = true;
          this.admin.next(true);
        } else {
          this.admin.next(false);
          this.isAdmin = false;
        }
        callback(false, res);
      }, (error) => {
        callback(error, null);
      })
  }

  getUsers(callback:any) {
    this.api.getUsers().subscribe((res: any) => {
      this.users = res;
      console.log('res: ', res);
      this.newUsersArrived.next(this.users);
      callback(null, res);
    }, (error) => {
      console.log('error', error);
      callback(error, null);
    });
  }

  newUser(data: any, callback: any) {
    let userData = {
      user: data
    }
    this.api.newUser(JSON.stringify(userData)).subscribe((res: any) => {
      // this.getUsers(() => {
      callback(null, res);
      // })
    }, (error) => {
      console.log('error', error);
      callback(error, null);
    });
  }

  deleteUser(user: any, callback: any) {
    user = {
      phone: user.phone,
      email: user.email
    }
    let user2Delete = {
      user: user
    }
    this.api.deleteUser(JSON.stringify(user2Delete)).subscribe((res: any) => {
      callback(null, res)
    }, (error) => {
      callback(error, null)
    }
    )
  }

  adminEdit(user: any) {
    this.isAdmin = true;
    this.adminEditUser = user;
  }

  updateUser(user:any,callback:any){
    let user2Update = {
      user: user
    }

    this.api.updateUser(JSON.stringify(user2Update)).subscribe((res: any) => {
      this.prouser = res;
      this.getUsers((err:any,res:any) => {
        callback(null, res);
      })
    }, (error) => {
      console.log('error', error);
      callback(error, null);
    });
  }

}
