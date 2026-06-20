import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineCard } from './vaccine-card';

describe('VaccineCard', () => {
  let component: VaccineCard;
  let fixture: ComponentFixture<VaccineCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccineCard],
    }).compileComponents();

    fixture = TestBed.createComponent(VaccineCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
