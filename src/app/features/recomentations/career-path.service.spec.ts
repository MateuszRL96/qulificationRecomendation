import { TestBed } from '@angular/core/testing';

import { CareerPathService } from './career-path.service';

describe('CareerPathService', () => {
  let service: CareerPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareerPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
