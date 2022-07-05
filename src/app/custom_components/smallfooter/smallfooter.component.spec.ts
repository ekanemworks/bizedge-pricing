import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallfooterComponent } from './smallfooter.component';

describe('SmallfooterComponent', () => {
  let component: SmallfooterComponent;
  let fixture: ComponentFixture<SmallfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallfooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
