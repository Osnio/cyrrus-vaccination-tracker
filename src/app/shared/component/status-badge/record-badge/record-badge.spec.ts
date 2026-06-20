import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordBadge } from './record-badge';

describe('RecordBadge', () => {
  let component: RecordBadge;
  let fixture: ComponentFixture<RecordBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
