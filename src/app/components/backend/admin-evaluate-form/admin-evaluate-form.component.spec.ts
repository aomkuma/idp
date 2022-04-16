import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEvaluateFormComponent } from './admin-evaluate-form.component';

describe('AdminEvaluateFormComponent', () => {
  let component: AdminEvaluateFormComponent;
  let fixture: ComponentFixture<AdminEvaluateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEvaluateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEvaluateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
