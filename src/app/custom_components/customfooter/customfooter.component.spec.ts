import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomfooterComponent } from './customfooter.component';

describe('CustomfooterComponent', () => {
  let component: CustomfooterComponent;
  let fixture: ComponentFixture<CustomfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomfooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
