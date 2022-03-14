import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActivityManageComponent } from './admin-activity-manage.component';

describe('AdminActivityManageComponent', () => {
  let component: AdminActivityManageComponent;
  let fixture: ComponentFixture<AdminActivityManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminActivityManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActivityManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
