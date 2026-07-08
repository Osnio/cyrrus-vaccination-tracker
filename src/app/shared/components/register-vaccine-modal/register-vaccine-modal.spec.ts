import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVaccineModal } from './register-vaccine-modal';

describe('RegisterVaccineModal', () => {
  let component: RegisterVaccineModal;
  let fixture: ComponentFixture<RegisterVaccineModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterVaccineModal],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterVaccineModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
