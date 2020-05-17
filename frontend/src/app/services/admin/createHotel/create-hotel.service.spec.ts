import { TestBed } from '@angular/core/testing';

import { CreateHotelService } from './create-hotel.service';

describe('CreateHotelService', () => {
  let service: CreateHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
