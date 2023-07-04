import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekersComponent } from './job-seekers.component';

describe('JobSeekersComponent', () => {
  let component: JobSeekersComponent;
  let fixture: ComponentFixture<JobSeekersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobSeekersComponent]
    });
    fixture = TestBed.createComponent(JobSeekersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
