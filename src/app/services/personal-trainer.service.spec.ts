import { TestBed } from '@angular/core/testing';

import { PersonalTrainerService } from './personal-trainer.service';

describe('PersonalTrainerService', () => {
  let service: PersonalTrainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalTrainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
