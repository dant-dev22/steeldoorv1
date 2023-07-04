import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobsService } from '../jobs.service';
// We are going to use this modal to handle create new job
@Component({
  selector: 'app-create-job-modal',
  templateUrl: './create-job-modal.component.html',
  styleUrls: ['./create-job-modal.component.css']
})
export class CreateJobModalComponent {
  @Input() isModalOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() jobCreated = new EventEmitter<any>();

  newJob: any = {
    company_name: '',
    job_location: '',
    job_title: '',
    job_description: '',
    salary_range: null,
    skills_set: []
    
  };

  constructor(
    public activeModal: NgbActiveModal,
    private jobsService: JobsService
  ) {}

  closeModal(): void {
    this.modalClosed.emit();
    this.activeModal.dismiss();
  }

  createJob(): void {
    this.jobsService.addWork(this.newJob)
      .then((response) => {
        this.jobCreated.emit(response);
        this.newJob = {
          company_name: '',
          job_location: '',
          job_title: '',
          job_description: '',
          salary_range: null,
          skills_set: []
        };
        this.activeModal.dismiss();
      })
      .catch((error) => {
        console.error('Error al crear el trabajo:', error);
      });
  }
}
