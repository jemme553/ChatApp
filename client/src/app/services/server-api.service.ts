import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IsloggedinService } from '../auth/isloggedin.service';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {

  constructor(
    private http: HttpClient,
    private isloggedinService: IsloggedinService
  ) { }

  login(data: string) {
    const httpOption = { headers: new HttpHeaders({ 'content-Type': 'application/json' }) };
    return this.http.post('https://jamal-ib.com:3053/login', data, httpOption);
  }

  getUsers() {
    const httpOption = { headers: new HttpHeaders({ 'Authorization': this.isloggedinService.getToken() }) };
    return this.http.get('https://jamal-ib.com:3053/users/users', httpOption);
  }

  newUser(data: string) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.isloggedinService.getToken()
      }),
    };
    return this.http.post('https://jamal-ib.com:3053/users/newuser', data, httpOption);
  }

  deleteUser(data: String) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.isloggedinService.getToken()
      }),
    };
    return this.http.post('https://jamal-ib.com:3053/users/deleteuser', data, httpOption);
  }

  updateUser(data: string) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.isloggedinService.getToken()
      }),
    };
    return this.http.post('https://jamal-ib.com:3053/users/updateuser', data, httpOption);
  }

  writefileBase64(data: string) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.isloggedinService.getToken()
      }),
    };
    return this.http.post('https://jamal-ib.com:3053/files', data, httpOption);
  }

  getMessages() {
    {
      const httpOption = { headers: new HttpHeaders({ 'Authorization': this.isloggedinService.getToken() }) };
      return this.http.get('https://jamal-ib.com:3053/messages', httpOption);
    }
  }
  getPrivateMessages(data: string) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.isloggedinService.getToken()
      }),
    };
    return this.http.post('https://jamal-ib.com:3053/messages/private', data, httpOption);
  }

  newPrivateMessages(data: string) {
    const httpOption = { headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Authorization': this.isloggedinService.getToken()
    }),
   };
    return this.http.post('https://jamal-ib.com:3053/messages/saveprivate', data, httpOption);
  }

}
