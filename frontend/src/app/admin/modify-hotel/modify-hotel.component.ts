import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { ActivatedRoute } from '@angular/router';
import { first, catchError, tap } from 'rxjs/operators';
import { Room } from 'src/app/model/room.model';
import { ReplaySubject, empty } from 'rxjs';

@Component({
  selector: 'app-modify-hotel',
  templateUrl: './modify-hotel.component.html',
  styleUrls: ['./modify-hotel.component.css']
})
export class ModifyHotelComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
  ) { }

  id: string;
  name: string;
  owner: string;
  numberOfRooms: number;
  rooms: Room[];
  copyOfRooms: Room[];

  indices: number[] = [];
  show: boolean[] = [];

  msg$ = new ReplaySubject<string>();
  color: string = 'green';

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(
      data => {
        this.id = data.id;
        this.hotelService.getHotelById(this.id).pipe(first()).subscribe(
          data => {
            this.name = data.name;
            this.owner = data.owner;
            this.numberOfRooms = data.rooms.length;
            for (let i=0; i<this.numberOfRooms; i++) {
              this.indices.push(Number(i));
              this.show.push(true);
            }
            this.copyOfRooms = this.rooms = data.rooms;
          }
        );
      }
    )
  }

  private newRoom = () => ({
    roomNumber: null,
    numberOfBeds: null,
    isFree: true,
  });

  private newRoomWithParams = (rN: number, nOB: number, iF: boolean) => ({
    roomNumber: rN,
    numberOfBeds: nOB,
    isFree: iF,
  });

  updateNumberOfRooms(number: number) {
    this.indices = [];
    this.rooms = [];
    this.show = [];

    for (let i=0; i<number; i++) {
      this.indices.push(Number(i));
      this.rooms.push(i < this.copyOfRooms.length 
        ? this.newRoomWithParams(
            this.copyOfRooms[i].roomNumber,
            this.copyOfRooms[i].numberOfBeds,
            this.copyOfRooms[i].isFree,
          )
        : this.newRoom());
      this.show.push(true);
    }
  }

  clickSave(index: number) {
    console.log(this.rooms[index]);
    this.show[index] = false;
  }

  clickModify() {
    console.log('modify');
    let freeRooms = 0;
    for (let room of this.rooms) {
      if (room.isFree) {
        freeRooms++;
      }
    }
    this.hotelService.modifyHotel(this.id, this.name, this.owner, freeRooms, this.rooms)
      .pipe(
        first(),
        catchError(error => {
          console.log(error);
          this.color = 'red';
          this.msg$.next(error);
          return empty();
        }),
        tap(data => {
          console.log(data);
          this.color = 'green';
          this.msg$.next(data.msg);
        })
      )
      .subscribe();
  }

}
