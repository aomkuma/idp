import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateFormSupervisorComponent } from './evaluate-form-supervisor.component';

describe('EvaluateFormSupervisorComponent', () => {
  let component: EvaluateFormSupervisorComponent;
  let fixture: ComponentFixture<EvaluateFormSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluateFormSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateFormSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
