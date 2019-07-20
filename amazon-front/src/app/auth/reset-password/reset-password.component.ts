import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  private token ='';
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  onSubmit() {
    let { password, confirmPassword } = this.form.value;
    if (password !== confirmPassword) {
      alert('Password and Confirm Password should be same ');
    }
    this.authService.resetPassword({token:this.token,password})
    .subscribe((data)=>{
      alert('Password updated successfully');
      this.router.navigate(['/login']);
    },error=>console.error(error));
  }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.token = this.route.snapshot.params['token'];
  }

}
