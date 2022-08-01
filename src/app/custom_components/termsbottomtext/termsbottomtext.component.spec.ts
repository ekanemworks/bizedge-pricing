import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsbottomtextComponent } from './termsbottomtext.component';

describe('TermsbottomtextComponent', () => {
  let component: TermsbottomtextComponent;
  let fixture: ComponentFixture<TermsbottomtextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsbottomtextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsbottomtextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
