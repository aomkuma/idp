import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryManageComponent } from './salary-manage.component';

describe('SalaryManageComponent', () => {
  let component: SalaryManageComponent;
  let fixture: ComponentFixture<SalaryManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
