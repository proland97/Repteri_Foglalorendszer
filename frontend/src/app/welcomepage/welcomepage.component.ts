import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrateService } from '../services/registrate/registrate.service';

@Component({
  selector: 'welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private registrateService: RegistrateService) { }

  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  msg: string;
  wrongUsernameMessage: string = '';
  wrongEmailMessage: string = '';
  wrongPasswordMessage: string = '';
  wrongConfirmPasswordMessage: string = '';

  ngOnInit(): void {
    localStorage.clear();

    this.route.params.subscribe(params => {
      console.log(params);
      if(params && params.msg) {
        this.msg = params.msg;
      }
    });
  }

  clickRegistrate() {
    this.clearErrorMessages();
    this.registrateService.registrate(this.username, this.email, this.password, this.confirmPassword).subscribe(
      data => {
        console.log('data: ', data);
        localStorage.setItem('username', this.username);
        this.router.navigate(['/startpage']);
      },
      error => {
        console.log('error: ', error);
        this.processErrors(error.error.errorMessages);
      }
    );
  }

  clearErrorMessages() {
    this.wrongUsernameMessage = this.wrongEmailMessage = this.wrongPasswordMessage = this.wrongConfirmPasswordMessage = '';
  }

  processErrors(errors: string[]) {
    for (let error of errors) {
      if (error.includes('Username') || error.includes('exists')) {
        this.wrongUsernameMessage += error + '\n';
      } else if (error.includes('Email')) {
        this.wrongEmailMessage += error + '\n';
      } else if (error.includes('Passwords')) {
        this.wrongConfirmPasswordMessage += error + '\n';
      } else if (error.includes('Password')) {
        this.wrongPasswordMessage += error + '\n';
      }
      console.log(error);
    }
  }

}
