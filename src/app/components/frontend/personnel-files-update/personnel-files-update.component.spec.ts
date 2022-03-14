import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelFilesUpdateComponent } from './personnel-files-update.component';

describe('PersonnelFilesUpdateComponent', () => {
  let component: PersonnelFilesUpdateComponent;
  let fixture: ComponentFixture<PersonnelFilesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelFilesUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelFilesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
