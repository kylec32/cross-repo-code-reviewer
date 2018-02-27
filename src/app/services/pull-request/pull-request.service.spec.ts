import { TestBed, inject } from '@angular/core/testing';

import { PullRequestService } from './pull-request.service';

describe('PullRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PullRequestService]
    });
  });

  it('should be created', inject([PullRequestService], (service: PullRequestService) => {
    expect(service).toBeTruthy();
  }));
});
