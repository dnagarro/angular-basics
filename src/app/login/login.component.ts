import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ["david.g@nagarro.com", [Validators.required, Validators.email]],
    password: ["111111", Validators.required],
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {

  }
  
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/items']);
    }
  }

  onSubmit(): void {

    let username = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    if (username != undefined && password != undefined) {
      this.authService.login(username, password)
        .subscribe({
          next: (response) => {
            console.log('set token');
            this.authService.setToken(response.user.token);
            this.authService.setUser();
            this.router.navigate(['/items']);
          },
          error: (err) => {
            alert('Invalid user or password');
          }
        });
    }
  }
}
