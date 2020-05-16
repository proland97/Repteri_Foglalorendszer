import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
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
