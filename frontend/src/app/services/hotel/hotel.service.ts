import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getHotels(): Observable<any> {
    return this.http.get(environment.hotelsUrl, this.httpOptions);
  }

  getHotelById(id: string): Observable<any> {
    return this.http.get(environment.getHotelUrl + '/' + id, this.httpOptions);
  }

  rateHotel(hotelName: string, stars: number) {
    return this.http.post(environment.rateUrl, {hotelName, stars}, this.httpOptions).pipe(
      catchError(error => throwError(error))
    );
  }
}
