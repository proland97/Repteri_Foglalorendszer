import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListHotelsService } from 'src/app/services/hotel/read/list-hotels.service';

@Component({
  selector: 'admin-startpage',
  templateUrl: './admin-startpage.component.html',
  styleUrls: ['./admin-startpage.component.css']
})
export class AdminStartpageComponent implements OnInit {

  constructor(private router: Router, private listHotelsService: ListHotelsService) {
  }

  ngOnInit(): void { }

  clickCreateHotel() {
    this.router.navigate(['/app/admin/create']);
  }
}
