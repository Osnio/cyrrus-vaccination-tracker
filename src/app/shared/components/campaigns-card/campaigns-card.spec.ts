import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsCard } from './campaigns-card';

describe('CampaignsCard', () => {
  let component: CampaignsCard;
  let fixture: ComponentFixture<CampaignsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
