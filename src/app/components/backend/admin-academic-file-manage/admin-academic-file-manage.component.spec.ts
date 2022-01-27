import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAcademicFileManageComponent } from './admin-academic-file-manage.component';

describe('AdminAcademicFileManageComponent', () => {
  let component: AdminAcademicFileManageComponent;
  let fixture: ComponentFixture<AdminAcademicFileManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAcademicFileManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAcademicFileManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
