import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDisciplineDetailManageComponent } from './admin-discipline-detail-manage.component';

describe('AdminDisciplineDetailManageComponent', () => {
  let component: AdminDisciplineDetailManageComponent;
  let fixture: ComponentFixture<AdminDisciplineDetailManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDisciplineDetailManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDisciplineDetailManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
