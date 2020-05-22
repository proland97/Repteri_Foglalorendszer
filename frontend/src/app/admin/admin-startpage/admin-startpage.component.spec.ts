import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStartpageComponent } from './admin-startpage.component';

describe('AdminStartpageComponent', () => {
  let component: AdminStartpageComponent;
  let fixture: ComponentFixture<AdminStartpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStartpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStartpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
