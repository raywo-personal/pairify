import {TestBed} from '@angular/core/testing';

import {DomainLogicService} from './domain-logic.service';


describe('DomainLogicService', () => {
  let service: DomainLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
