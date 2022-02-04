import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDisciplineUpdateManageComponent } from './admin-discipline-update-manage.component';

describe('AdminDisciplineUpdateManageComponent', () => {
  let component: AdminDisciplineUpdateManageComponent;
  let fixture: ComponentFixture<AdminDisciplineUpdateManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDisciplineUpdateManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDisciplineUpdateManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
