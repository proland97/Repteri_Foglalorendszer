import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HotelService } from '../services/hotel/hotel.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {

  constructor(
    private router: Router,
    private hotelService: HotelService,
  ) { }

  hotels: [];

  ngOnInit(): void {
    this.hotelService.getHotels().pipe(first()).subscribe(
      data => {
        this.hotels = data;
        console.log(data);
        console.log(this.hotels.length);
      }
    );
  }

  clickViewRatings(id: string) {
    this.router.navigate(['/app/ratings', id]);
  }

  clickViewFreeRooms(id: string) {
    this.router.navigate(['/app/rooms', id]);
  }

  clickMyReservations() {
    this.router.navigate(['/app/reservations']);
  }

}
