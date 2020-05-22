import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { first, catchError, tap, switchMap } from 'rxjs/operators';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { empty } from 'rxjs';
import { Room } from 'src/app/model/room.model';

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
  rooms: Room[];
  hotelName: string;

  freeRoomExists: boolean = false;

  loading: boolean;

  ngOnInit(): void {
    this.loading = true;
    this.route.params
      .pipe(
        switchMap(data => {
          this.id = data.id;
          return this.hotelService.getHotelById(this.id)
        }),
        first()
      )
      .subscribe(
        data => {
          this.loading = false;
          this.rooms = data.rooms;
          this.hotelName = data.name;

          for (let room of this.rooms) {
            if (room.isFree) {
              this.freeRoomExists = true;
              break;
            }
          }
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
    this.hotelService.getHotelById(this.id)
      .pipe(
        first()
      )
      .subscribe(
        data => {
          this.rooms = data.rooms;
        }
      );
  }

  viewPictures(id: string) {
    this.router.navigate(['app/rooms', this.id, id]);
  }
}
