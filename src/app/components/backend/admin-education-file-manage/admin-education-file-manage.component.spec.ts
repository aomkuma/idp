import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEducationFileManageComponent } from './admin-education-file-manage.component';

describe('AdminEducationFileManageComponent', () => {
  let component: AdminEducationFileManageComponent;
  let fixture: ComponentFixture<AdminEducationFileManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEducationFileManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEducationFileManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
