import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistlistComponent } from './therapistlist.component';

describe('TherapistlistComponent', () => {
  let component: TherapistlistComponent;
  let fixture: ComponentFixture<TherapistlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapistlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
