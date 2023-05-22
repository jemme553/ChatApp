import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsloggedinService {

  loggedIn: boolean = false;
  loginEvent = new Subject();
  token:string = '';

  constructor( ) { }

  setLogin(login:boolean){
    this.loggedIn = login;
    return this.loginEvent.next(login);
  }

  getLogin(){
    return this.loggedIn;
  }

  getToken(){
    return this.token;
  }

  setToken(token:any) :void{
    console.log('token',token);
    return this.token = token;
  }

}
