import { TestBed } from '@angular/core/testing';

import { OrderrService } from './orderr.service';

describe('OrderrService', () => {
  let service: OrderrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
