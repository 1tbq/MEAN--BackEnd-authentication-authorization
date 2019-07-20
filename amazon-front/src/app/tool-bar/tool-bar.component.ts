import { Component, OnInit } from '@angular/core';
import { JwtService } from '../core/services/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  constructor(private jwtService:JwtService,
    private router:Router,
    private authServie:AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.authServie.logout().subscribe(data=>{
      console.log(data.success)},
      error=>{
        console.error(error)},
        ()=>{
          this.jwtService.distroyToken();
          this.router.navigate(['/login']);
        });    
  }
}
