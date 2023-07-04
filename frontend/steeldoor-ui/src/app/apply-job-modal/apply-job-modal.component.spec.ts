import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyJobModalComponent } from './apply-job-modal.component';

describe('ApplyJobModalComponent', () => {
  let component: ApplyJobModalComponent;
  let fixture: ComponentFixture<ApplyJobModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyJobModalComponent]
    });
    fixture = TestBed.createComponent(ApplyJobModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
