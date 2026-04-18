import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSheet } from './request-sheet';

describe('RequestSheet', () => {
  let component: RequestSheet;
  let fixture: ComponentFixture<RequestSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestSheet],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
