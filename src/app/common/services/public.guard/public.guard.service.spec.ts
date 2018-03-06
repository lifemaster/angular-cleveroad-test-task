import { TestBed, inject } from '@angular/core/testing';

import { PublicGuardService } from './public.guard.service';

describe('Public.GuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicGuardService]
    });
  });

  it('should be created', inject([PublicGuardService], (service: PublicGuardService) => {
    expect(service).toBeTruthy();
  }));
});
