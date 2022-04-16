import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdpActivityComponent } from './idp-activity.component';

describe('IdpActivityComponent', () => {
  let component: IdpActivityComponent;
  let fixture: ComponentFixture<IdpActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdpActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdpActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
