import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink, Router, NavigationEnd } from "@angular/router";
import { userData } from "../../core/interfaces/userInterface";
import { globalConstant } from "../../core/globalConstants/tokenConstant";
import { filter } from 'rxjs';
@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  userInfo!: userData;
  isActive: boolean = false;
  readonly targetRoute = '/Admin';

  constructor(private router: Router) {
    const userData = localStorage.getItem(globalConstant.TOKEN_KEY)
    if (userData !== null) {
      this.userInfo = JSON.parse(userData)
    }

  }
  ngOnInit() {
    this.checkRouter(this.router.url)

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkRouter(event.urlAfterRedirects)
    })
  }
  checkRouter(url: string) {
    this.isActive = url === this.targetRoute;
  }
  logout() {
    localStorage.removeItem(globalConstant.TOKEN_KEY);
    this.router.navigateByUrl('/login');
  }
}




