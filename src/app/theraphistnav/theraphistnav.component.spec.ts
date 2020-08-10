import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheraphistnavComponent } from './theraphistnav.component';

describe('TheraphistnavComponent', () => {
  let component: TheraphistnavComponent;
  let fixture: ComponentFixture<TheraphistnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheraphistnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheraphistnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
