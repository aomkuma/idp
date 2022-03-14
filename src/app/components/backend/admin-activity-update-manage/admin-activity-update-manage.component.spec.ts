import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActivityUpdateManageComponent } from './admin-activity-update-manage.component';

describe('AdminActivityUpdateManageComponent', () => {
  let component: AdminActivityUpdateManageComponent;
  let fixture: ComponentFixture<AdminActivityUpdateManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminActivityUpdateManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActivityUpdateManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
