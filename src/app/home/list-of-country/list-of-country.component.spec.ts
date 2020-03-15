import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCountryComponent } from './list-of-country.component';

describe('ListOfCountryComponent', () => {
  let component: ListOfCountryComponent;
  let fixture: ComponentFixture<ListOfCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
