import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../_models/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(userData: User) {
      return this.http.post<any>(`${environment.API_URL}/login`, userData);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

}
