import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {

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
            this.router.navigate(['/items']);
          },
          error: (err) => {
          }
        });
    }
  }
}
