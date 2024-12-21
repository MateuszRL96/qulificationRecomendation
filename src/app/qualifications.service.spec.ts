import { TestBed } from '@angular/core/testing';

import { QualificationsService } from './qualifications.service';

describe('QualificationsService', () => {
  let service: QualificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
