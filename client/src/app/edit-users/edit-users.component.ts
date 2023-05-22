import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../app.component';
import { ServerApiService } from '../services/server-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})

export class EditUsersComponent implements OnInit {

  user!: User;
  isAdmin: boolean = false;
  editForm!: FormGroup;
  fileData: any;
  fileName: any;
  previewUrl: any = null;
  role:string ='';
  age:any;
  ngOnInit(): void {
    this.role = this.userService.prouser.role;
    this.user = this.userService.user2Edit;
    let dt = new Date(this.user.age);
    let timeDiff = Math.abs(Date.now() - dt.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    console.log(age);
    this.age = age;
    if(this.role !== 'admin') {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
    this.previewUrl = this.user.photo;
    
    this.editForm = this.formBuilder.group({
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.user.phone,[Validators.required]),
      fname: new FormControl(this.user.name,[Validators.required]),
      lname: new FormControl(this.user.lname,[Validators.required]),
      city: new FormControl(this.user.city,[Validators.required]),
      country: new FormControl(this.user.country,[Validators.required]),
      street: new FormControl(this.user.street),
      zip: new FormControl(this.user.zip),
      about: new FormControl(this.user.about),
      age: new FormControl(this.user.age),
      role: new FormControl(this.user.role,[Validators.required])
    });

  }

  constructor(
    private router: Router,
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private api : ServerApiService,
    private _snackBar: MatSnackBar,
    private toast: NgToastService,
   ) {

  }

  updateUser(user: any) {
    if(this.editForm.invalid){
      this.toast.error({detail:'Error',summary:'Something wrong with your Details', sticky:true,position:'tr'})
    } else {
      let newUser = {
        email: this.editForm.get('email')?.value,
        phone: this.editForm.get('phone')?.value,
        name: this.editForm.get('fname')?.value,
        lname: this.editForm.get('lname')?.value,
        city: this.editForm.get('city')?.value,
        country: this.editForm.get('country')?.value,
        role: this.editForm.get('role')?.value,
        about: this.editForm.get('about')?.value,
        zip: this.editForm.get('zip')?.value,
        age: this.editForm.get('age')?.value,
        street: this.editForm.get('street')?.value,
        photo:'',
      }
      if(this.previewUrl){
        newUser.photo = this.previewUrl;
      } else {
        newUser.photo = this.user.photo
      }
      console.log(newUser);
      this.userService.updateUser(newUser, (error: any, result: any) => {
        if (error) console.log(error);
        if (result) {
          console.log(result);
          this.router.navigate(['/profile']);
          // this._snackBar.open("User Updated", "", {duration: 2000, panelClass:['alert-green'],});
          this.toast.success({detail:'Success',summary:'User Updated', sticky:true,position:'tr'})
        };
      })
    }
   
  }

  goProfile() {
    this.router.navigate(['/profile']);
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

}
