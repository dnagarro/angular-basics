import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
  <a class='navbar-brand'>User: {{user}}</a>
  
  <div class='collapse navbar-collapse' id='navbarNav'>
    <ul class='navbar-nav'>
      <li class='nav-item'><a class='nav-link' routerLink='/home'>Home</a></li>
      <li class='nav-item'><a class='nav-link' routerLink='/about'>About</a></li>
      <li class='nav-item'><a class='nav-link' routerLink='/contact'>Contact</a></li>
      <li *ngIf="isLoggedIn" class='nav-item'><a class='nav-link' routerLink='/items'>Items</a></li>
      <li *ngIf="!isLoggedIn" class='nav-item'><a class='nav-link' routerLink='/login'>Login</a></li>
      <li *ngIf="isLoggedIn" class='nav-item'><a class='nav-link' (click)="logout()">Logout</a></li>
    </ul>
  </div>
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
  logout(): void {
    if (this.authService.logout()) {
      this.router.navigate(['/home']);
    }
  }
}
