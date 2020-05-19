import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-rooms',
  templateUrl: './edit-rooms.component.html',
  styleUrls: ['./edit-rooms.component.css']
})
export class EditRoomsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
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

}
