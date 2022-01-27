import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkInfoFileManageComponent } from './admin-work-info-file-manage.component';

describe('AdminWorkInfoFileManageComponent', () => {
  let component: AdminWorkInfoFileManageComponent;
  let fixture: ComponentFixture<AdminWorkInfoFileManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWorkInfoFileManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWorkInfoFileManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
