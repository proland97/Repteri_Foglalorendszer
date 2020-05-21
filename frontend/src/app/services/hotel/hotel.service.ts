import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Room } from 'src/app/model/room.model';

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

  createHotel(name: string, owner: string, freeRooms: number, rooms: Room[]): Observable<any> {
    return this.http.post(environment.createHotelUrl, {name, owner, freeRooms, rooms}, this.httpOptions).pipe(
      catchError(error => throwError(error.error.message))
    );
  }

  modifyHotel(hotelId: string, name: string, owner: string, freeRooms: number, rooms: Room[]): Observable<any> {
    return this.http.post(environment.modifyHotelUrl, {hotelId, name, owner, freeRooms, rooms}, this.httpOptions).pipe(
      catchError(error => throwError(error.error.message))
    );
  }

  deleteHotel(hotelId: string): Observable<any> {
    return this.http.post(environment.deleteHotelUrl, {hotelId}, this.httpOptions).pipe(
      catchError(error => throwError(error))
    );
  }

  uploadImageForHotel(formData: FormData): Observable<any> {
    const httpOptions = {
      withCredentials: true,
    };
    return this.http.post(environment.uploadHotelImageUrl, formData, httpOptions).pipe(
      catchError(error => throwError(error))
    );
  }

  deleteHotelImages(hotelName: string): Observable<any> {
    return this.http.post(environment.deleteHotelImagesUrl, {hotelName}, this.httpOptions).pipe(
      catchError(error => throwError(error))
    );
  }
}
