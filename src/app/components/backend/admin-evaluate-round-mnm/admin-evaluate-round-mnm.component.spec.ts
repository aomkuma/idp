import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEvaluateRoundMnmComponent } from './admin-evaluate-round-mnm.component';

describe('AdminEvaluateRoundMnmComponent', () => {
  let component: AdminEvaluateRoundMnmComponent;
  let fixture: ComponentFixture<AdminEvaluateRoundMnmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEvaluateRoundMnmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEvaluateRoundMnmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
