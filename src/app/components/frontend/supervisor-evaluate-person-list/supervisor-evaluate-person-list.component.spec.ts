import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorEvaluatePersonListComponent } from './supervisor-evaluate-person-list.component';

describe('SupervisorEvaluatePersonListComponent', () => {
  let component: SupervisorEvaluatePersonListComponent;
  let fixture: ComponentFixture<SupervisorEvaluatePersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorEvaluatePersonListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorEvaluatePersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
