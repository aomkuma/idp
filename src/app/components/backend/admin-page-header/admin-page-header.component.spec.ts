import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageHeaderComponent } from './admin-page-header.component';

describe('AdminPageHeaderComponent', () => {
  let component: AdminPageHeaderComponent;
  let fixture: ComponentFixture<AdminPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
