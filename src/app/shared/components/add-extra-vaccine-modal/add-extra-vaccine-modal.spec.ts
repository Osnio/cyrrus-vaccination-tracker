import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtraVaccineModal } from './add-extra-vaccine-modal';

describe('AddExtraVaccineModal', () => {
  let component: AddExtraVaccineModal;
  let fixture: ComponentFixture<AddExtraVaccineModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExtraVaccineModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AddExtraVaccineModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
