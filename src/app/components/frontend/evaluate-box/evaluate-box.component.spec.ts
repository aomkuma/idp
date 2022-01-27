import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateBoxComponent } from './evaluate-box.component';

describe('EvaluateBoxComponent', () => {
  let component: EvaluateBoxComponent;
  let fixture: ComponentFixture<EvaluateBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluateBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
