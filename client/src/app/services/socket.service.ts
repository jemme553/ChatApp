import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from "socket.io-client"
import { Message } from '../app.component';
import { Subject } from 'rxjs';


class socketMessage implements Message {

  mess: string;
  time: Date;
  user: string = '';
  constructor(message: any, id: any) {
    const answer = JSON.parse(message);
    this.mess = answer.message;
    if (id === answer.user) this.user = 'me';
    else this.user = answer.user;
    this.time = new Date();
  }
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  user: any;
  socket: any;
  myUser: any;
  onlineUsers: any;
  getUsers = new Subject();
  message: any;
  privateMessage:any;
  // newMessage = new Subject();
  constructor(
  ) {
    this.socket = io("https://jamal-ib.com:3053");

    // this.socket.on("getMessage", (message: Message) => {
    //   // let mess = new socketMessage(message, this.socket.id)
    //   // console.log(this.socket,message);
    //   // console.log(this.myUser);
    //   console.log(message);
    //   this.newMessage.next(message);
    // })



    this.socket.on("onlineusers", (users: any) => {
      console.log(users);
      this.onlineUsers = users;
      this.getUsers.next(users);
    })
  }

  setConnectedUser(user: any) {
    this.user = user;
  }

  setLogoutUser(){
    this.socket.emit("disconnecteduser");
  }



  sendPrivateMessage(message: any){
    console.log(message);
    this.socket.emit("sendPrivateMessage", message);
  }

  // getprivateMessage() {
  //   return new Observable((observer) => {
  //     this.socket.on("private-message", (ans: Message) => {
  //       let mess = new socketMessage(ans, this.socket.id)
  //       console.log(this.socket,ans);
  //       console.log(this.user);
  //       console.log(mess);
  //       observer.next(mess);
  //     })
  //   })
  // }

  sendMessage(message: any) {
    this.message = {
      user: this.user.name,
      message: message,
      time: new Date(),
      photo: this.user.photo,
      email: this.user.email,
    }
    this.socket.emit("message", this.message);
  }

  // getMessage() {
  //   return new Observable((observer) => {
  //     this.socket.on("getMessage", (message: Message) => {
  //       let mess = new socketMessage(message, this.socket.id)
  //       console.log(this.socket,message);
  //       console.log(this.myUser);
  //       console.log(mess);
  //       observer.next(mess);
  //     })
  //   })
  // }


}
