import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../services/logout/logout.service';
import { first, catchError, tap } from 'rxjs/operators';
import { empty } from 'rxjs';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private logoutService: LogoutService) { }

  ngOnInit(): void {
  }

  clickLogout() {
    this.logoutService.logout()
      .pipe(
        first(),
        catchError(error => {
          console.log('error:', error);
          return empty();
        }),
        tap(data => {
          console.log('data:', data);
          this.router.navigate(['/welcomepage']);
        })
      )
      .subscribe();
  }

}
