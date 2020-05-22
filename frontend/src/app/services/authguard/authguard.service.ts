import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivateChild {

  constructor(private router: Router) { }

  canActivateChild(): boolean {
    const username = localStorage.getItem('username');
    if (username) {
      return true;
    } else {
      this.router.navigate(['/welcomepage', {msg: 'Unauthorized access'}]);
      return false;
    }
  }
}
