import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesummaryComponent } from './purchasesummary.component';

describe('PurchasesummaryComponent', () => {
  let component: PurchasesummaryComponent;
  let fixture: ComponentFixture<PurchasesummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
