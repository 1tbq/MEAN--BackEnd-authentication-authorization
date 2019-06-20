import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  authForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService) { }

  ngOnInit() {
    this.initForm();
  }
onSubmit(){
  console.log(this.authForm.value);
  this.authService.login(this.authForm.value)
  .subscribe((data)=>{
    console.log(data);
  },error=>console.error(error));
}
  private initForm(){
    this.authForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
}
