import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdsManageComponent } from './admin-ads-manage.component';

describe('AdminAdsManageComponent', () => {
  let component: AdminAdsManageComponent;
  let fixture: ComponentFixture<AdminAdsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAdsManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
