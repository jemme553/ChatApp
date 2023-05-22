import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatApp';
  socket: any;
  constructor() {
  }
}


export interface User {
  [x: string]: any;
  name:string,
  lname:string,
  phone:string,
  role:string,
  email:string,
  city:string,
  country:string,
  age:Date,
  street:string,
  zip:string,
  about:string,
  photo:string,
  status:string,
}

export interface Message {
  user:string,
  mess:string,
  time: Date,
}