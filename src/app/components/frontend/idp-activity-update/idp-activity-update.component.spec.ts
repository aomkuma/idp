import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdpActivityUpdateComponent } from './idp-activity-update.component';

describe('IdpActivityUpdateComponent', () => {
  let component: IdpActivityUpdateComponent;
  let fixture: ComponentFixture<IdpActivityUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdpActivityUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdpActivityUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
