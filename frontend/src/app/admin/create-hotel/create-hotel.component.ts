import { Component, OnInit } from '@angular/core';
import { CreateHotelService } from 'src/app/services/admin/createHotel/create-hotel.service';
import { first, catchError, tap } from 'rxjs/operators';
import { empty, ReplaySubject } from 'rxjs';

@Component({
  selector: 'create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.css']
})
export class CreateHotelComponent implements OnInit {

  constructor(private createHotelService: CreateHotelService) { }

  name: string;
  owner: string;
  freeRooms: number;
  rooms: [];

  msg$ = new ReplaySubject<string>();

  ngOnInit(): void {
  }

  clickCreateHotel() {
    this.createHotelService.createHotel(this.name, this.owner, this.freeRooms)
    .pipe(
      first(),
      catchError(error => {
        console.log('error: ', error);
        this.msg$.next(error);
        return empty();
      }),
      tap(data => {
        console.log('data: ', data);
        if(data.success) {
          this.msg$.next('Hotel successfully created.');
        } else {
          this.msg$.next(data.msg);
        }
      })
    )
    .subscribe();
  }

}
