import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { FormControl, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('wrapper', { static: true })
  wrapper!: ElementRef;
  message = new FormControl('', Validators.required)
  onlineUsers: any;
  messages: any = [];
  selectedUser: any;
  private: boolean = false;
  user: any;

  constructor(
    private socketService: SocketService,
    private userService: UsersService,
    private renderer: Renderer2,
    private messagesService: MessagesService,

  ) {
    this.socketService.socket.on('getMessage', (message: any) => {
      message = JSON.parse(message);
      message = message.message;
      console.log(message);
      this.messages.push(message);
    })
    this.socketService.socket.on('getPrivateMessage', (privateMessage: any) => {
      console.log(privateMessage);
      let message = {
        user: privateMessage.from.name,
        message: privateMessage.message,
        time: new Date(),
        photo: privateMessage.from.photo,
      }
      console.log(message);
      this.messages.push(message);
    })
    //*****     For updating online users while inside the chat component */
    this.socketService.getUsers.subscribe((users) => {
      this.onlineUsers = users;
    })

  }

  ngOnInit(): void {
    //*****     For updating online users after getting inside the chat component */
    this.onlineUsers = this.socketService.onlineUsers;
    this.user = this.userService.prouser

    this.messagesService.getMessages(() => { })
    this.messagesService.newMessageArrived.subscribe((messages) => {
      this.messages = messages;
      console.log(messages);
    })
  }

  sendMessage() {
    let message: any = {
      user: this.user.name,
      message: this.message.value,
      time: new Date(),
      photo: this.user.photo,
      email: this.user.email,
    }
    this.messages.push(message);
    console.log(this.message.value);
    this.socketService.sendMessage(this.message.value);
    this.message.setValue('');
  }

  sendPrivateMessage() {
    let message = {
      message: this.message.value,
      to: this.selectedUser,
      from: this.user,
      time: new Date(),
    }
    let newM = {
      user: this.user.name,
      message: this.message.value,
      time: new Date(),
      photo: this.user.photo,
      email: this.user.email,
    }
    console.log(newM);
    this.messages.push(newM);
    // this.messagesService.newPrivateMessages(message);
    this.socketService.sendPrivateMessage(message);
    this.message.setValue('');
  }

  selectUser(user: any) {
    // console.log(user);
    if (user === false) {
      this.private = false;
      this.messagesService.getMessages(() => { })
      this.messagesService.newMessageArrived.subscribe((messages) => {
        this.messages = messages;
        // console.log(messages);
      })
    } else {
      // console.log(user);
      this.selectedUser = user;
      let users = {
        selectedUser: user.user,
        user: this.user,
      }
      // email phone name lname photo role
      let newMessages = this.messagesService.getPrivateMessages(users);
      console.log(newMessages);
      this.private = true;
      this.messages = [];
    }
  }

}
