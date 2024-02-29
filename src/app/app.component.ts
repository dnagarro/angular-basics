import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
    <a class='navbar-brand'>{{title}}</a>
    <ul class='nav nav-pills'>
      <li><a class='nav-link' routerLink='/home'>Home</a></li>
      <li><a class='nav-link' routerLink='/about'>About</a></li>
      <li><a class='nav-link' routerLink='/contact'>Contact</a></li>
      <li *ngIf="isLoggedIn"><a class='nav-link' routerLink='/items'>Items</a></li>
      <li *ngIf="!isLoggedIn"><a class='nav-link' routerLink='/login'>Login</a></li>
    </ul>
  </nav>
  <div class='container'>
    <router-outlet></router-outlet>
  </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-basics';
  isLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService) {

  }
  ngOnInit(): void {

    this.authService.getLoginSuccessObservable().subscribe(() => {
    
      this.isLoggedIn = this.authService.isLoggedIn();
      console.log(this.isLoggedIn);
    });

    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     const currentUrl = event.url;
    //     if (currentUrl.includes('/items')) {
    //       this.authService.redirectUnauthorizeToLoginPage();
    //     }
    //   }
    // });
  }
}
