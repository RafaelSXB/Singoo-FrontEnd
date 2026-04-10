import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageResult } from './stage-result';

describe('StageResult', () => {
  let component: StageResult;
  let fixture: ComponentFixture<StageResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageResult],
    }).compileComponents();

    fixture = TestBed.createComponent(StageResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
