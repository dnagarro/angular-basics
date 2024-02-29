import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IdentityUser } from "../models/identityuser";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private router: Router, private httpClient: HttpClient, private formBuilder: FormBuilder) {

    }
    private identityServerUrl = 'https://api.realworld.io/api';
    private token = new Subject<boolean>();

    login(username: string, password: string): Observable<{ user: IdentityUser }> {
        const data = {
            user: {
                email: username,
                password: password,
            }
        };

        return this.httpClient.post<{ user: IdentityUser }>(`${this.identityServerUrl}/users/login`, data);

    }

    isLoggedIn(): boolean {
        return this.getToken() != '';
    }

    // //move this to route guard
    // redirectUnauthorizeToLoginPage(): void {
    //     if (!this.isLoggedIn()) {
    //         this.router.navigate(['/login']);
    //     }
    // }

    getToken(): string {
        let token = localStorage.getItem('token') ?? '';
        return token;
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
        this.token.next(true);
    }

    getLoginSuccessObservable() {
        return this.token.asObservable();
    }

}