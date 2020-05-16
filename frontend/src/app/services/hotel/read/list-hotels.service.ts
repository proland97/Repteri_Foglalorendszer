import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListHotelsService {

  constructor(private http: HttpClient) { }

  getHotels(): Observable<any> {
    const httpOptions = {
      //withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(environment.hotelsUrl, httpOptions);
  }
}
