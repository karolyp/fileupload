import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  url = 'http://localhost:8080/register'
  constructor(private http: HttpClient) { }

  registerUser(userData): Observable<any> {
    return this.http.post<any>(this.url, userData);
  }

}
