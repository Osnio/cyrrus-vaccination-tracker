import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsChildren } from './reports-children';

describe('ReportsChildren', () => {
  let component: ReportsChildren;
  let fixture: ComponentFixture<ReportsChildren>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsChildren],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsChildren);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
