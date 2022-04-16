import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorEvaluateFormComponent } from './supervisor-evaluate-form.component';

describe('SupervisorEvaluateFormComponent', () => {
  let component: SupervisorEvaluateFormComponent;
  let fixture: ComponentFixture<SupervisorEvaluateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorEvaluateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorEvaluateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
