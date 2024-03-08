import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { IdentityUser } from '../shared/models/identityuser';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'login', 'setToken', 'setUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],

    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to items if user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);
    component.ngOnInit();
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/items']);
  });

  it('should not navigate if user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);
    component.ngOnInit();
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });


  it('should login successfully', fakeAsync(() => {
    const identityUserMock: { user: IdentityUser } = { user: { email: 'email@email.com', bio: '', image: '', token: 'sometoken', username: 'email@email.com' } };
    authService.login.and.returnValue(of(identityUserMock));
    component.loginForm.setValue({
      email: 'email@email.com',
      password: '111111',
    });
    component.onSubmit();
    tick();
    expect(authService.login).toHaveBeenCalledWith('email@email.com', '111111');
    expect(authService.setToken).toHaveBeenCalledWith('sometoken');
    expect(authService.setUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/items']);
  }));
  it('should show Invalid user or password alert', fakeAsync(() => {
    
    const errorResponse = 'Invalid user or password';
    authService.login.and.returnValue(throwError(() => new Error(errorResponse)));

    spyOn(window, 'alert'); 

    component.onSubmit();
    tick(); 

    expect(window.alert).toHaveBeenCalledWith(errorResponse);
    expect(router.navigate).not.toHaveBeenCalled();
  }));
});
