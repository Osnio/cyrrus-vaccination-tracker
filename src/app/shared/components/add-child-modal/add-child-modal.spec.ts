import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChildModal } from './add-child-modal';

describe('AddChildModal', () => {
  let component: AddChildModal;
  let fixture: ComponentFixture<AddChildModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChildModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AddChildModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
