import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateJobModalComponent } from '../create-job-modal/create-job-modal.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: any[] = [];

  constructor(private jobsService: JobsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getJobs();
  }

  async getJobs(): Promise<void> {
    try {
      const response = await this.jobsService.getJobs();
      this.jobs = response;
    } catch (error) {
      console.error('Error retrieving jobs:', error);
    }
  }

  async deleteWork(workId: string): Promise<void> {
    try {
      await this.jobsService.deleteWork(workId);
      this.getJobs(); // Update the job list after deleting one
    } catch (error) {
      console.error('Error deleting the job:', error);
    }
  }

  async editWork(workId: string): Promise<void> {
    try {
      // Get the job to edit
      const work = await this.jobsService.getWork(workId);

      // Open the edit modal with the job data
      const modalRef = this.modalService.open(CreateJobModalComponent);
      modalRef.componentInstance.job = work; // Pass the job to the modal component

      modalRef.result.then(
        (result) => {
          // Actions to perform when the modal is closed
          console.log('Modal closed', result);
          this.getJobs(); // Update the job list after editing one
        },
        (reason) => {
          // Actions to perform if the modal is closed unexpectedly
          console.log('Modal closed unexpectedly', reason);
        }
      );
    } catch (error) {
      console.error('Error getting the job:', error);
    }
  }

  openCreateJobModal(): void {
    const modalRef = this.modalService.open(CreateJobModalComponent);
    modalRef.result.then(
      (result) => {
        // Actions to perform when the modal is closed
        console.log('Modal closed', result);
        this.getJobs(); // Update the job list after creating one
      },
      (reason) => {
        // Actions to perform if the modal is closed unexpectedly
        console.log('Modal closed unexpectedly', reason);
      }
    );
  }
}
