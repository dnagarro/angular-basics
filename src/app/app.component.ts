import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
    <a class='navbar-brand'>User: {{user}}</a>
    <br>
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
  user = 'angular-basics';
 
  isLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.user = this.authService.getUserDetails().username;
    this.authService.getLoginSuccessObservable().subscribe(() => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });

    this.authService.getUserDetailsSuccessObservable().subscribe((response) => {
        this.user = response.username;
    });
  }
}
