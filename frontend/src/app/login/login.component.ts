import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { first, catchError, tap } from 'rxjs/operators';
import { empty, ReplaySubject } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  username: string;
  password: string;

  msg$ = new ReplaySubject<string>();

  ngOnInit(): void {
    localStorage.clear(); // minden elemet eltávolít belőle
    // csak egy elem eltávolításához: localStorage.removeItem('az elem neve');
  }

  /*navigateBack() {
    this.router.navigate(['/welcomepage', {msg: 'Back from login'}]);
  }*/

  clickLogin() {
    this.loginService.login(this.username, this.password).pipe(
      first(),
      catchError(error => {
        console.log('error: ', error);
        this.msg$.next(error);
        return empty();
      }),
      tap(data => {
        console.log('data: ', data);
        localStorage.setItem('username', this.username);
        localStorage.setItem('role', data.role);
        if (data.role === 'admin') {
          this.router.navigate(['/main']);
        } else {
          this.router.navigate(['/startpage']);
        }
      })
    ).subscribe();
  }

}
