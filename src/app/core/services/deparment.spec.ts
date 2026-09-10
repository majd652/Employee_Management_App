import { TestBed } from '@angular/core/testing';
import { Deparment } from './deparment';

describe('Deparment', () => {
  let service: Deparment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Deparment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
