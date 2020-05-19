import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  reservate(hotelName: string, roomNumber: Number): Observable<any> {
    return this.http.post(environment.reservationUrl, {hotelName, roomNumber}, this.httpOptions).pipe(
      catchError(error => throwError(error))
    );
  }

  getReservations(): Observable<any> {
    return this.http.get(environment.myReservationsUrl, this.httpOptions);
  }
}
