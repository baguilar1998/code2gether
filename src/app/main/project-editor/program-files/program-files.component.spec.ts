import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramFilesComponent } from './program-files.component';

describe('ProgramFilesComponent', () => {
  let component: ProgramFilesComponent;
  let fixture: ComponentFixture<ProgramFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
