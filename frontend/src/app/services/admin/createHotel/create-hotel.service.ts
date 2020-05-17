import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateHotelService {

  constructor(private http: HttpClient) { }

  createHotel(name: string, owner: string, freeRooms: number): Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(environment.createHotelUrl, {name, owner, freeRooms}, httpOptions).pipe(
      catchError(error => throwError(error))
    );
  }

}
