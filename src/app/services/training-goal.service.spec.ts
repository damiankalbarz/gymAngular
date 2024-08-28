import { TestBed } from '@angular/core/testing';

import { TrainingGoalService } from './training-goal.service';

describe('TrainingGoalService', () => {
  let service: TrainingGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
