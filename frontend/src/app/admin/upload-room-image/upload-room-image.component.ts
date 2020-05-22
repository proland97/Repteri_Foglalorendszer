import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, catchError, tap, filter, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject, empty } from 'rxjs';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'upload-room-image',
  templateUrl: './upload-room-image.component.html',
  styleUrls: ['./upload-room-image.component.css']
})
export class UploadRoomImageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private formBuilder: FormBuilder,
  ) { }

  hotelName: string;
  rooms: [];
  show: boolean[] = [];

  msg$ = new ReplaySubject<string>();
  color: string;

  uploadForm: FormGroup;

  loading: boolean;

  ngOnInit(): void {
    this.loading = true;
    this.route.params
      .pipe(
        switchMap(data => {
          return this.hotelService.getHotelById(data.id);
        }),
        filter(data => !!data.rooms),
        first()
      )
      .subscribe(
        data => {
          this.loading = false;
          this.hotelName = data.name;
          this.rooms = data.rooms;
          for (let i = 0; i < this.rooms.length; i++) {
            this.show.push(false);
          }
        }
      )

    this.uploadForm = this.formBuilder.group({
      picture: ['']
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('picture').setValue(file);
    }
  }

  onSubmit(roomNumber: number, i: number) {
    const formData = new FormData();
    formData.append('hotelImage', this.uploadForm.get('picture').value);
    formData.append('hotelName', this.hotelName);
    formData.append('roomNumber', roomNumber.toString());

    this.hotelService.uploadImageForRoom(formData)
      .pipe(
        first(),
        catchError(error => {
          console.log(error);
          return empty();
        }),
        tap(data => {
          console.log(data);
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

  clickDeletePictures(roomNumber: number) {
    this.hotelService.deleteRoomImages(this.hotelName, roomNumber)
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

}
