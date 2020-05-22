import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrateService {

  constructor(private http: HttpClient) { }

  registrate(username: string, email: string, password: string, confirmPassword: string): Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(environment.registrateUrl, {
      username, email, password, confirmedpassword: confirmPassword
    }, httpOptions);
  }
}
