import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsCard } from './reports-card';

describe('ReportsCard', () => {
  let component: ReportsCard;
  let fixture: ComponentFixture<ReportsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
