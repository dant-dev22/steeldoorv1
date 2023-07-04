import { Component, Output, EventEmitter, ChangeDetectorRef, Input } from '@angular/core';
import { ApplyJobService } from '../apply-job.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-apply-job-modal',
  templateUrl: './apply-job-modal.component.html',
  styleUrls: ['./apply-job-modal.component.css']
})
export class ApplyJobModalComponent {
  @Output() applied: EventEmitter<void> = new EventEmitter<void>();
  @Input() showModal: boolean = false; // Add the input property 'showModal'

  applyFormData = {
    name: '',
    email: '',
    resume: null,
    id_worker: ''
  };
  resumeReady = false;
  responseMessage: string = ''; // Variable to store the response of the call

  constructor(
    private applyJobService: ApplyJobService,
    private cdr: ChangeDetectorRef
  ) { }

  openApplyJobForm(): void {
    this.applyFormData = {
      name: '',
      email: '',
      resume: null,
      id_worker: this.generateWorkerId()
    };
    this.resumeReady = false;
    this.showModal = true;
    this.cdr.detectChanges();
  }

  closeApplyJobForm(): void {
    this.applyFormData = {
      name: '',
      email: '',
      resume: null,
      id_worker: ''
    };
    this.responseMessage = '';
    this.showModal = false;
    this.cdr.detectChanges();
  }

  handleResumeChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.applyFormData.resume = files[0];
      this.resumeReady = true;
    }
  }

  generateWorkerId(): string {
    return uuidv4();
  }

  submitApplyJobForm(): void {
    const formData = new FormData();
    formData.append('name', this.applyFormData.name);
    formData.append('email', this.applyFormData.email);
    if (this.applyFormData.resume) {
      formData.append('resume', this.applyFormData.resume);
    }
    formData.append('id_worker', this.applyFormData.id_worker);

    this.applyJobService.applyJob(formData)
      .then((response) => {
        this.responseMessage = response;
        this.applied.emit();
        this.closeApplyJobForm();
      })
      .catch((error) => {
        console.error('Error sending application', error);
        this.responseMessage = 'Error submitting application';
      });
  }
}
