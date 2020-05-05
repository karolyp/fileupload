import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './_services/auth.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.verifyToken().pipe(
      map(userLoggedIn => {
        if (userLoggedIn) {
          this.router.navigate(['/my-files']);
        }
        return !userLoggedIn;
      }),
      catchError(err => {
        if (err.status === 401) {
          return of(true);
        }
        return of(false);
      })
    );
  }
}
