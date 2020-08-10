import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientnavComponent } from './patientnav.component';

describe('PatientnavComponent', () => {
  let component: PatientnavComponent;
  let fixture: ComponentFixture<PatientnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
