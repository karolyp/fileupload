import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {
  }

  registerUser(userData): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/register`, userData);
  }
}
