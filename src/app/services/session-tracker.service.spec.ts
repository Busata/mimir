import { TestBed } from '@angular/core/testing';

import { SessionTrackerService } from './session-tracker.service';

describe('SessionTrackerService', () => {
  let service: SessionTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
