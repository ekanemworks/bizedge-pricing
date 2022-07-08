import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolbuttonsComponent } from './coolbuttons.component';

describe('CoolbuttonsComponent', () => {
  let component: CoolbuttonsComponent;
  let fixture: ComponentFixture<CoolbuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoolbuttonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoolbuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
