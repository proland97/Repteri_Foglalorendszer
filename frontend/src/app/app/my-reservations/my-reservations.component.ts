import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {

  constructor(
    private reservationService: ReservationService,
  ) { }

  reservations: [];

  loading: boolean;

  ngOnInit(): void {
    this.loading = true;
    this.reservationService.getReservations()
      .pipe(
        first()
      )
      .subscribe(
        data => {
          this.loading = false;
          this.reservations = data;
          console.log(this.reservations);
        }
      );
  }

}
