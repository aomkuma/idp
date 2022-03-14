import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdsUpdateManageComponent } from './admin-ads-update-manage.component';

describe('AdminAdsUpdateManageComponent', () => {
  let component: AdminAdsUpdateManageComponent;
  let fixture: ComponentFixture<AdminAdsUpdateManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAdsUpdateManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdsUpdateManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
