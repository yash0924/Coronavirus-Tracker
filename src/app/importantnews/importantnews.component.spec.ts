import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantnewsComponent } from './importantnews.component';

describe('ImportantnewsComponent', () => {
  let component: ImportantnewsComponent;
  let fixture: ComponentFixture<ImportantnewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantnewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
