import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../services/logout/logout.service';

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
    this.logoutService.logout().subscribe(
      data => {
        console.log('data:', data);
        this.router.navigate(['/welcomepage']);
      },
      error => {
        console.log('error:', error)
      }
    );
  }

}
