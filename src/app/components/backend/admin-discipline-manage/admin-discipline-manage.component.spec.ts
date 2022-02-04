import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDisciplineManageComponent } from './admin-discipline-manage.component';

describe('AdminDisciplineManageComponent', () => {
  let component: AdminDisciplineManageComponent;
  let fixture: ComponentFixture<AdminDisciplineManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDisciplineManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDisciplineManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
