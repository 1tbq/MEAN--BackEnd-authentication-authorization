import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { JwtService } from '../core/services/jwt.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  authForm:FormGroup;
  title:string ='';
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private jwtService :JwtService,
    private router:Router
    ) { }

  ngOnInit() {
    this.initForm();
    this.title = this.router.url === '/login'? 'Login':'Signup';
  }

onSubmit(){
  if(this.title === 'Signup'){
    this.authService.signup(this.authForm.value)
    .subscribe(data=>{
      console.log(data);
      this.router.navigate(['/shop']);
    },error=>console.log(error));
  }else{
    this.authService.login(this.authForm.value)
    .subscribe((data)=>{
      console.log(data);
      this.jwtService.setToken(data.token);
      this.router.navigate(['/shop']);
    },error=>console.error(error));
  }  
}
  private initForm(){
    this.authForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

googleAuthHandler(){
  
}

forgotPassword(){
  console.log("clicked forgot passwrod")
}

}
