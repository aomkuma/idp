import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonnelListMnmComponent } from './admin-personnel-list-mnm.component';

describe('AdminPersonnelListMnmComponent', () => {
  let component: AdminPersonnelListMnmComponent;
  let fixture: ComponentFixture<AdminPersonnelListMnmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPersonnelListMnmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPersonnelListMnmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
