import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
    <a class='navbar-brand'>{{title}}</a>
    <ul class='nav nav-pills'>
      <li><a class='nav-link' routerLink='/home'>Home</a></li>
      <li><a class='nav-link' routerLink='/about'>About</a></li>
      <li><a class='nav-link' routerLink='/contact'>Contact</a></li>
      <li><a class='nav-link' routerLink='/items'>Items</a></li>
    </ul>
  </nav>
  <div class='container'>
    <router-outlet></router-outlet>
  </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-basics';
}
