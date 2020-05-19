import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
  ) { }

  id: string;
  roomNumber: string;
  pictures: [];

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(
      data => {
        this.id = data.id;
        this.hotelService.getHotelById(this.id).pipe(first()).subscribe(
          data => {
          }
        );
      }
    )
  }

}
