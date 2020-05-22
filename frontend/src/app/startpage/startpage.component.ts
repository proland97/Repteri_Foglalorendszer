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

  loading: boolean;

  ngOnInit(): void {
    this.loading = true;
    this.hotelService.getHotels()
      .pipe(
        first()
      )
      .subscribe(
        data => {
          this.loading = false;
          this.hotels = data;
        }
      );
  }

  clickViewRatings(id: string) {
    this.router.navigate(['/app/ratings', id]);
  }

  clickViewFreeRooms(id: string) {
    this.router.navigate(['/app/rooms', id]);
  }

  clickPictures(id: string) {
    this.router.navigate(['/app/pictures', id]);
  }

  clickMyReservations() {
    this.router.navigate(['/app/reservations']);
  }

}
