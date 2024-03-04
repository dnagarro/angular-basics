import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { IdentityUser } from "../models/identityuser";
import { HttpHeaders } from "@angular/common/http";

describe('AuthService', () => {
    let authService: AuthService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService],
        });

        authService = TestBed.inject(AuthService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    it('login should return user data', () => {
        const username = 'test@example.com';
        const token = 'token';
        const password = '111111';

        const mockUserResponse = { user: { bio: '', email: username, image: '', token: token, username: username } };
        authService.login(username, password).subscribe((response) => {
            expect(response).toEqual(mockUserResponse);
        });

        const req = httpTestingController.expectOne(`https://api.realworld.io/api/users/login`);
        req.flush(mockUserResponse);
    });

    it('logout should remove local storage data', () => {
        let result = authService.logout();
        expect(result).toBe(true);

        let userDetails = authService.getUserDetails();
        expect(userDetails).toEqual({} as IdentityUser);

        let token = authService.getToken();
        expect(token).toBe('');

        let isLoggedIn = authService.isLoggedIn();
        expect(isLoggedIn).toBe(false);
    });

    it('getToken should return token that was set from setToken', () => {

        const token = 'token';
        authService.setToken(token);
        let result = authService.getToken();
        expect(result).toBe(token);
    });

    it('setUser should set user details from localstorage', () => {
        const mockUserResponse = {
            user: {
                bio: 'Test Bio',
                email: 'test@example.com',
                image: 'test-image.jpg',
                token: 'test-token',
                username: 'test_user',
            },
        }

        authService.setToken(mockUserResponse.user.token);
        authService.setUser();

        const req = httpTestingController.expectOne(`https://api.realworld.io/api/user`);
        expect(req.request.method).toEqual('GET');
        expect(req.request.headers.get('Authorization')).toEqual(`Token ${authService.getToken()}`);

        req.flush(mockUserResponse);

        var result = authService.getUserDetails();
        console.log(result);
        console.log(mockUserResponse.user);
        expect(result).toEqual(mockUserResponse.user);
    });

    it('isLoggedIn should return true or false', () => {

        const token = 'token';
        authService.setToken('');
        let result = authService.isLoggedIn();
        expect(result).toBe(false);
        authService.setToken(token);
        result = authService.isLoggedIn();
        expect(result).toBe(true);
    });

    it('should return an observable that emits tokens', (done) => {
        const testToken = 'test-token';
    
        // Subscribe to the observable returned by getLoginSuccessObservable
        authService.getLoginSuccessObservable().subscribe((token) => {
          // Expectations
          expect(token).toBe(testToken);
          done(); // Indicate that the asynchronous test is done
        });
    
        // Emit a mock token using the token subject
        authService['token'].next(testToken);
      });

      it('should return an observable that emits IdentityUser', (done) => {
        const mockIdentitUser: IdentityUser = {
            bio: 'Test Bio',
            email: 'test@example.com',
            image: 'test-image.jpg',
            token: 'test-token',
            username: 'test_user',
        };

        // Subscribe to the observable returned by getLoginSuccessObservable
        authService.getUserDetailsSuccessObservable().subscribe((identityUser) => {
          // Expectations
          expect(identityUser).toBe(mockIdentitUser);
          done(); // Indicate that the asynchronous test is done
        });
    
        // Emit a mock token using the token subject
        authService['identityUser'].next(mockIdentitUser);
      });
});