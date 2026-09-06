import { Component} from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink, Router,NavigationEnd } from "@angular/router";
import {  NgIf } from "@angular/common";
import { userData } from "../../core/interfaces/userInterface";
import { tokenConstant } from "../../core/globalConstants/tokenConstant";
@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  userInfo!: userData;
  isActive: boolean = true;
  readonly targetRoute = '/Admin';

  constructor(private router : Router) {
    const userData = localStorage.getItem(tokenConstant.TOKEN_KEY)
    if (userData !== null) {
      this.userInfo = JSON.parse(userData)
    }
    
  }
  ngOnInit(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isActive = event.url === this.targetRoute;
      }
    });
  }
  logout(){
    localStorage.removeItem(tokenConstant.TOKEN_KEY);
    this.router.navigateByUrl('/login');
  }
}




