import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ServerApiService } from './server-api.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: any;
  constructor(
    private api: ServerApiService,
  ) { }
  newMessageArrived = new Subject();

  getMessages(callback: any) {
    this.api.getMessages().subscribe((res: any) => {
      this.messages = res;
      this.newMessageArrived.next(res);
      callback(null, res);
    }, (error) => {
      console.log('error', error);
      callback(error, null);
    });
  }

  getPrivateMessages(users: any) {
    console.log('users: ', users);
    users = {
      to: {
        email: users.selectedUser.email,
        phone: users.selectedUser.phone,
        name: users.selectedUser.name,
        lname: users.selectedUser.lname,
        photo: users.selectedUser.photo,
        role: users.selectedUser.role,
      },
      from: {
        email: users.user.email,
        phone: users.user.phone,
        name: users.user.name,
        lname: users.user.lname,
        photo: users.user.photo,
        role: users.user.role,
      },
    }
    console.log(users);
    this.api.getPrivateMessages(JSON.stringify(users)).subscribe((res: any) => {
      console.log(res);
      // this.messages = res;
      // this.newMessageArrived.next(res);
      return res;
    })

  }

  newPrivateMessages(Msg: any) {
    this.api.newPrivateMessages(JSON.stringify(Msg)).subscribe((res: any) => {
      console.log(res);
    })
  }
}
