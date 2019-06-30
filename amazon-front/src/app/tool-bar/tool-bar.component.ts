import { Component, OnInit } from '@angular/core';
import { JwtService } from '../core/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  constructor(private jwtService:JwtService,private router:Router) { }

  ngOnInit() {
  }

  logout(){
    this.jwtService.distroyToken();
    this.router.navigate(['/login']);
  }

}
