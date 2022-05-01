import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateBcdComponent } from './date-bcd.component';

describe('DateBcdComponent', () => {
  let component: DateBcdComponent;
  let fixture: ComponentFixture<DateBcdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateBcdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateBcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
