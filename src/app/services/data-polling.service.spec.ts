import { TestBed } from '@angular/core/testing';

import { DataPollingService } from './data-polling.service';

describe('DataPollingService', () => {
  let service: DataPollingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPollingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
