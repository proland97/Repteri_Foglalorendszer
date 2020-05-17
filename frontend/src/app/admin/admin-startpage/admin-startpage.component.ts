import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

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
    this.hotelService.getHotels().pipe(first()).subscribe(
      data => {
        this.hotels = data;
        console.log(data);
        console.log(this.hotels.length);
      }
    );
  }

  clickCreateHotel() {
    this.router.navigate(['/app/admin/create']);
  }
}
