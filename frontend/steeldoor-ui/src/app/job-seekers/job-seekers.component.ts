import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplyJobModalComponent } from '../apply-job-modal/apply-job-modal.component';

@Component({
  selector: 'app-job-seekers',
  templateUrl: './job-seekers.component.html',
  styleUrls: ['./job-seekers.component.css']
})
export class JobSeekersComponent implements OnInit {
  jobs: any[] = [];
  showApplyJobModal = false; // Add this property to control the visibility of the apply job modal

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
  //calling to applyJob Modal to handle new applications
  openApplyJobModal(jobId: string): void {
    try {
      const modalRef = this.modalService.open(ApplyJobModalComponent);
      const job = this.jobs.find(j => j._id === jobId);
      modalRef.componentInstance.job = job;
      modalRef.result.then(
        () => {
          console.log('Modal closed');
          this.getJobs();
        },
        (reason) => {
          console.log('Modal dismissed:', reason);
        }
      );

      // Set showModal to true to display the apply job modal
      this.showApplyJobModal = true;
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  }
}
