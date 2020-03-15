import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveredNumberComponent } from './recovered-number.component';

describe('RecoveredNumberComponent', () => {
  let component: RecoveredNumberComponent;
  let fixture: ComponentFixture<RecoveredNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveredNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveredNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
