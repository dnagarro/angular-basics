import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "../shared/services/auth.service";
import { ToDoItemsGuard } from "./todo-items.guard";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

describe('ToDoItemsGuard', () => {
    let authGuard: ToDoItemsGuard;
    let authService: jasmine.SpyObj<AuthService>;
    let router: Router;

    beforeEach(() => {
        const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                ToDoItemsGuard,
                { provide: AuthService, useValue: authServiceSpy }
            ]
        });

        authGuard = TestBed.inject(ToDoItemsGuard);
        authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
        router = TestBed.inject(Router);
    });

    it('should allow activation when the user is logged in', () => {
        authService.isLoggedIn.and.returnValue(true);

        const result = authGuard.canActivate(
            new ActivatedRouteSnapshot(),
            { url: '/items' } as RouterStateSnapshot
        ) as Observable<boolean>;
            
        expect(authService.isLoggedIn).toHaveBeenCalledOnceWith();
    });

    it('should redirect to /login when the user is not logged in', () => {
        authService.isLoggedIn.and.returnValue(false);

        const navigateSpy = spyOn(router, 'navigate');
        const result = authGuard.canActivate(
            new ActivatedRouteSnapshot(),
            { url: '/items' } as RouterStateSnapshot
        ) as Observable<boolean | UrlTree>;

        expect(authService.isLoggedIn).toHaveBeenCalledOnceWith();
        expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
});