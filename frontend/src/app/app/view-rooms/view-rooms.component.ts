import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { first, catchError, tap } from 'rxjs/operators';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.css']
})
export class ViewRoomsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private reservationService: ReservationService,
  ) { }

  id: string;
  rooms: [];
  hotelName: string;

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(
      data => {
        this.id = data.id;
        this.hotelService.getHotelById(this.id).pipe(first()).subscribe(
          data => {
            this.rooms = data.rooms;
            this.hotelName = data.name;
          }
        );
      }
    )
  }

  reservate(roomNumber: string) {
    this.reservationService.reservate(this.hotelName, Number(roomNumber))
      .pipe(
        first(),
        catchError(error => {
          console.log(error);
          return empty();
        }),
        tap(data => {
          console.log(data);
          this.updateFreeRooms();
        })
      )
      .subscribe();
  }

  updateFreeRooms() {
    this.hotelService.getHotelById(this.id).pipe(first()).subscribe(
      data => {
        this.rooms = data.rooms;
      }
    );
  }

  viewPictures(id: string) {
    this.router.navigate(['app/rooms', this.id, id]);
  }
}
