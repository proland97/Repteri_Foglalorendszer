import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private hotelService: HotelService,
  ) { }

  id: string;
  images: [];
  message: string;

  ngOnInit(): void {
    this.route.params
      .pipe(
        first()
      )
      .subscribe(
        data => {
          this.id = data.id;
          this.hotelService.getHotelById(this.id)
            .pipe(
              first()
            )
            .subscribe(
              data2 => {
                if (data.id2) {
                  this.images = data2.rooms.filter(room => room._id === data.id2).flatMap(x => x.images);
                  this.message = 'for this room';
                } else {
                  this.images = data2.images;
                  this.message = 'for this hotel';
                }
              }
            )
        }
      );
  }

  clickBack() {
    this.router.navigate(['app/rooms', this.id]);
  }

}
