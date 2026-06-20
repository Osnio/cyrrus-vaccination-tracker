import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildProgressCard } from './child-progress-card';

describe('ChildProgressCard', () => {
  let component: ChildProgressCard;
  let fixture: ComponentFixture<ChildProgressCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildProgressCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildProgressCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
