import { TestBed } from '@angular/core/testing';

import { ListHotelsService } from './list-hotels.service';

describe('ListHotelsService', () => {
  let service: ListHotelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListHotelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
