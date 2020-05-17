import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivateChild {

  constructor(private router: Router) { }

  canActivateChild(): boolean {
    const role = localStorage.getItem('role');
    console.log(role);
    if (role === "admin") {
      return true;
    } else {
      this.router.navigate(['/welcomepage', {msg: 'not admin'}]);
      return false;
    }
  }
}
