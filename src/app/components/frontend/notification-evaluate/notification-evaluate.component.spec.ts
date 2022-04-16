import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationEvaluateComponent } from './notification-evaluate.component';

describe('NotificationEvaluateComponent', () => {
  let component: NotificationEvaluateComponent;
  let fixture: ComponentFixture<NotificationEvaluateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationEvaluateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
