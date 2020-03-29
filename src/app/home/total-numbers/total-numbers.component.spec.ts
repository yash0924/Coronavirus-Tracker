import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalNumbersComponent } from './total-numbers.component';

describe('TotalNumbersComponent', () => {
  let component: TotalNumbersComponent;
  let fixture: ComponentFixture<TotalNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
