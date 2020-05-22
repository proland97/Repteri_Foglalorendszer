import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { first, catchError, tap } from 'rxjs/operators';
import { empty, ReplaySubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'admin-startpage',
  templateUrl: './admin-startpage.component.html',
  styleUrls: ['./admin-startpage.component.css']
})
export class AdminStartpageComponent implements OnInit {

  constructor(
    private router: Router,
    private hotelService: HotelService,
    private formBuilder: FormBuilder,
  ) {
  }

  msg$ = new ReplaySubject<string>();
  color: string;

  hotels: [];
  show: boolean[] = [];

  uploadForm: FormGroup;

  ngOnInit(): void { 
    this.updateHotelList();

    this.uploadForm = this.formBuilder.group({
      picture: ['']
    });
  }

  clickCreateHotel() {
    this.router.navigate(['/app/admin/create']);
  }

  clickUploadRoomImage(id: string) {
    this.router.navigate(['/app/admin/rooms', id]);
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('picture').setValue(file);
    }
  }

  onSubmit(name: string, i: number) {
    const formData = new FormData();
    formData.append('hotelImage', this.uploadForm.get('picture').value);
    formData.append('hotelName', name);

    this.hotelService.uploadImageForHotel(formData)
      .pipe(
        first(),
        catchError(error => {
          console.log(error);
          return empty();
        }),
        tap(data => {
          this.msg$.next(data.msg);
          this.color = 'green';
        })
      )
      .subscribe();

    this.show[i] = false;
  }

  clickAddPictures(i: number) {
    this.show[i] = true;
  }

  clickDeletePictures(name: string) {
    this.hotelService.deleteHotelImages(name)
      .pipe(
        first(),
        catchError(error => {
          console.log(error);
          return empty();
        }),
        tap(data => {
          this.msg$.next(data.msg);
          this.color = 'green';
        })
      )
      .subscribe();
  }

  clickModify(id: string) {
    this.router.navigate(['/app/admin/modify', id]);
  }

  clickDelete(id: string) {
    this.hotelService.deleteHotel(id)
      .pipe(
        first(),
        catchError(error => {
          console.log(error);
          return empty();
        }),
        tap(data => {
          this.updateHotelList();
        })
      )
      .subscribe();
  }

  updateHotelList() {
    this.hotelService.getHotels().pipe(first()).subscribe(
      data => {
        this.hotels = data;
        for (let i = 0; i < this.hotels.length; i++) {
          this.show.push(false);
        }
      }
    );
  }

}
