import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, catchError, tap, switchMap } from 'rxjs/operators';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-view-ratings',
  templateUrl: './view-ratings.component.html',
  styleUrls: ['./view-ratings.component.css']
})
export class ViewRatingsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
  ) { }

  id: string;
  ratings: [];
  hotelName: string;

  options = [
    { name: "1", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
  ];
  star: string;

  loading: boolean;

  ngOnInit(): void {
    this.loading = true;
    this.route.params
      .pipe(
        switchMap(data => {
          this.id = data.id;
          return this.hotelService.getHotelById(this.id);
        }),
        first()
      )
      .subscribe(
        data => {
          this.loading = false;
          this.ratings = data.ratings;
          this.hotelName = data.name;
        }
      )
  }

  clickRate() {
    this.hotelService.rateHotel(this.hotelName, Number(this.star))
      .pipe(
        first(),
        catchError(error => {
          console.log(error);
          return empty();
        }),
        tap(data => {
          console.log(data);
          this.updateRatings();
        })
      )
      .subscribe();
  }

  updateRatings() {
    this.hotelService.getHotelById(this.id).pipe(first()).subscribe(
      data => {
        this.ratings = data.ratings;
      }
    );
  }

}
