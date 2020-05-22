import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRoomImageComponent } from './upload-room-image.component';

describe('UploadRoomImageComponent', () => {
  let component: UploadRoomImageComponent;
  let fixture: ComponentFixture<UploadRoomImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadRoomImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRoomImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
