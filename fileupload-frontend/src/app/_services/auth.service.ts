import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  verifyToken(): Observable<boolean> {
    if (localStorage.getItem('token') === null) {
      return of(false);
    }
    return this.http.post<any>(`${environment.API_URL}/verify`, {}).pipe(
      map(res => res && res.verified)
    );
  }

}
