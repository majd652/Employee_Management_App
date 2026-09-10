import { TestBed } from '@angular/core/testing';
import { Empolyee } from './empolyee';

describe('Empolyee', () => {
  let service: Empolyee;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Empolyee);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
