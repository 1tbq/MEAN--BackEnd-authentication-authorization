import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
form:FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email:['',Validators.required]
    });
  }
  onSubmit(){
    this.authService.forgotPassword(this.form.value).subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);
    })
  }

}
