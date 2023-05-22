import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { io } from 'socket.io-client';
import { SocketService } from '../services/socket.service';
import { UsersService } from '../services/users.service';
import { ServerApiService } from '../services/server-api.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  fileData: any;
  fileName: any;
  previewUrl: any = null;
  checked:boolean = false;

  public registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private socketService: SocketService,
    private api : ServerApiService,
    private toast: NgToastService,

  ) {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required]),
      fname: new FormControl('',[Validators.required]),
      lname: new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      country: new FormControl('',[Validators.required]),
    });
    // this.socket = io("https://jamal-ib.com:3053");
  }

  register() {
    let newUser = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      phone: this.registerForm.get('phone')?.value,
      fname: this.registerForm.get('fname')?.value,
      lname: this.registerForm.get('lname')?.value,
      city: this.registerForm.get('city')?.value,
      country: this.registerForm.get('country')?.value,
      role:'student',
      photo: this.previewUrl,
    }
    console.log('newuser: ', newUser);
    this.userService.newUser(newUser, (err: any, data: any) => {
      if (err) {
        this.registerForm.setValue({ email: '', password: '', phone:'', fname:'', lname:'', city:'', state:'' });
        console.log('Error registeration: ', err);
      } else {
        this.toast.success({detail:'Register Success',summary:'Welcome Dear: '+ data.name, sticky:true,position:'tr',duration:'3000'})
        this.upload()
        this.router.navigate(['/login']);
        console.log(data);
      }
    })
  }
  signin(){
    this.router.navigate(['/login']);
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    if (this.fileData) {
      const reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = (_event) => {
        this.previewUrl = reader.result;
        console.log(this.previewUrl);
      }
    }
  }

  upload(){
    console.log(this.previewUrl);
    const file2Server = {
      name:this.fileData.name,
      dirname:'',
      blob:this.previewUrl,
    };
    this.api.writefileBase64(JSON.stringify(file2Server)).subscribe((res:any)=>{
      console.log(res);
    }, (error)=>{
      console.log(error);
    });
  }

  check(){
    this.checked = !this.checked;
    console.log(this.checked);
  }

}
