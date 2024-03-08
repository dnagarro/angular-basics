import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

describe('AppComponent', () => {

  let component: AppComponent;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
      ],
      providers: [
        AppComponent,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    component = TestBed.inject(AppComponent);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should navigate to /home when logout is successful', () => {
    authService.logout.and.returnValue(true);

    component.logout();

    expect(authService.logout).toHaveBeenCalledOnceWith();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should not navigate when logout fails', () => {
    authService.logout.and.returnValue(false);

    component.logout();

    expect(authService.logout).toHaveBeenCalledOnceWith();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
