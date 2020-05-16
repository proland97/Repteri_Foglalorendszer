import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const username = localStorage.getItem('username');
    if (username) {
      return true;
    } else {
      this.router.navigate(['/welcomepage', {msg: 'Unauthorized access'}]);
      return false;
    }
  }
}
