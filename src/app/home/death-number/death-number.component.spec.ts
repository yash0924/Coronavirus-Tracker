import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathNumberComponent } from './death-number.component';

describe('DeathNumberComponent', () => {
  let component: DeathNumberComponent;
  let fixture: ComponentFixture<DeathNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
