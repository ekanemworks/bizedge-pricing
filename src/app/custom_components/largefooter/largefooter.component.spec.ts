import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargefooterComponent } from './largefooter.component';

describe('LargefooterComponent', () => {
  let component: LargefooterComponent;
  let fixture: ComponentFixture<LargefooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargefooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LargefooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
