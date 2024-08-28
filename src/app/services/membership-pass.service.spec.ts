import { TestBed } from '@angular/core/testing';

import { MembershipPassService } from './membership-pass.service';

describe('MembershipPassService', () => {
  let service: MembershipPassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipPassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
