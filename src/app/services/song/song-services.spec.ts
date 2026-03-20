import { TestBed } from '@angular/core/testing';

import { SongServices } from './song-services';

describe('SongServices', () => {
  let service: SongServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
