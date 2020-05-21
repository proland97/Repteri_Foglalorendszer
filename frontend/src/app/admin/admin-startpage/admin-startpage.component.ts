import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { first, catchError, tap } from 'rxjs/operators';
import { empty } from 'rxjs';

@Component({
  selector: 'admin-startpage',
  templateUrl: './admin-startpage.component.html',
  styleUrls: ['./admin-startpage.component.css']
})
export class AdminStartpageComponent implements OnInit {

  constructor(
    private router: Router,
    private hotelService: HotelService
  ) {
  }

  hotels: [];

  ngOnInit(): void { 
    this.updateHotelList();
  }

  clickCreateHotel() {
    this.router.navigate(['/app/admin/create']);
  }

  clickDelete(id: string) {
    this.hotelService.deleteHotel(id)
      .pipe(
        first(),
        catchError(error => {
          console.log(error);
          return empty();
        }),
        tap(data => {
          this.updateHotelList();
        })
      )
      .subscribe();
  }

  clickModify(id: string) {
    this.router.navigate(['/app/admin/modify', id]);
  }

  updateHotelList() {
    this.hotelService.getHotels().pipe(first()).subscribe(
      data => {
        this.hotels = data;
      }
    );
  }
}
