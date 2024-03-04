import { HttpClient, HttpHeaders } from "@angular/common/http";
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
    private token = new Subject<string>();
    private identityUser = new Subject<IdentityUser>();


    login(username: string, password: string): Observable<{ user: IdentityUser }> {
        const data = {
            user: {
                email: username,
                password: password,
            }
        };
        return this.httpClient.post<{ user: IdentityUser }>(`${this.identityServerUrl}/users/login`, data);
    }

    logout(): boolean {
        localStorage.removeItem('userDetails');
        localStorage.removeItem('token');
        const user: IdentityUser = { bio: '', email: '', image: '', token: '', username: '' };
        this.identityUser.next(user);
        this.token.next('');
        return true;
    }

    isLoggedIn(): boolean {
        return this.getToken() != '';
    }

    private setUser(): void {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.getToken()}`, // Add your authorization token if needed
        });

        this.httpClient.get<{ user: IdentityUser }>(`${this.identityServerUrl}/user`, { headers: headers }).subscribe({
            next: (response) => {
                localStorage.setItem('userDetails', JSON.stringify(response.user));
                this.identityUser.next(response.user);
            }
        });
    }
    getUserDetails(): IdentityUser {
        let userDetails = localStorage.getItem('userDetails') ?? '';
        if (userDetails != '') {
            const user: IdentityUser = JSON.parse(userDetails);
            return user;
        }
        return {} as IdentityUser;
    }
    getToken(): string {
        let token = localStorage.getItem('token') ?? '';
        return token;
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
        this.token.next(token);
        this.setUser();
    }

    getLoginSuccessObservable() {
        return this.token.asObservable();
    }
    getUserDetailsSuccessObservable() {
        return this.identityUser.asObservable();
    }
}