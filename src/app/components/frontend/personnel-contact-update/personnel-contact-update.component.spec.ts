import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelContactUpdateComponent } from './personnel-contact-update.component';

describe('PersonnelContactUpdateComponent', () => {
  let component: PersonnelContactUpdateComponent;
  let fixture: ComponentFixture<PersonnelContactUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelContactUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelContactUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
