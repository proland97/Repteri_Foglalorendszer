import { Component, OnInit } from '@angular/core';
import { first, catchError, tap } from 'rxjs/operators';
import { empty, ReplaySubject } from 'rxjs';
import { HotelService } from 'src/app/services/hotel/hotel.service';

interface Room {
  roomNumber: number;
  numberOfBeds: number;
  isFree: boolean;
}

@Component({
  selector: 'create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.css']
})
export class CreateHotelComponent implements OnInit {

  constructor(private hotelService: HotelService) { }

  name: string;
  owner: string;
  rooms: Room[] = [];

  indices: number[];
  show: boolean[];

  color: string = 'green';
  msg$ = new ReplaySubject<string>();

  ngOnInit(): void {
  }

  clickCreateHotel() {
    let freeRooms = 0;
    for (let room of this.rooms) {
      if (room.isFree) {
        freeRooms++;
      }
    }
    this.hotelService.createHotel(this.name, this.owner, freeRooms, this.rooms)
    .pipe(
      first(),
      catchError(error => {
        console.log('error: ', error);
        this.color = 'red';
        this.msg$.next(error);
        return empty();
      }),
      tap(data => {
        console.log('data: ', data);
        if(data.sucess) {
          this.color = 'green';
          this.msg$.next(data.msg);
        } else {
          this.color = 'red';
          this.msg$.next(data.msg);
        }
      })
    )
    .subscribe();
  }

  private newRoom = () => ({
    roomNumber: null,
    numberOfBeds: null,
    isFree: true,
  });

  updateNumberOfRooms(number: number) {
    this.indices = [];
    this.rooms = [];
    this.show = [];
    for (let i=0; i < number; i++) {
      this.indices.push(Number(i));
      this.rooms.push(this.newRoom());
      this.show.push(true);
    }
  }

  clickSave(index: number) {
    console.log(this.rooms[index]);
    this.show[index] = false;
  }

}
