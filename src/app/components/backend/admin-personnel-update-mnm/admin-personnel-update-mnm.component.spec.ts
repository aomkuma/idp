import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonnelUpdateMnmComponent } from './admin-personnel-update-mnm.component';

describe('AdminPersonnelUpdateMnmComponent', () => {
  let component: AdminPersonnelUpdateMnmComponent;
  let fixture: ComponentFixture<AdminPersonnelUpdateMnmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPersonnelUpdateMnmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPersonnelUpdateMnmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
