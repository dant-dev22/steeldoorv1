import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { ApplyJobModalComponent } from './apply-job-modal/apply-job-modal.component';
import { FormsModule } from '@angular/forms';
import { ModalService } from "../app/modal-service.service";
import { CreateJobModalComponent } from './create-job-modal/create-job-modal.component';
import { JobSeekersComponent } from './job-seekers/job-seekers.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobsComponent,
    ApplyJobModalComponent,
    CreateJobModalComponent,
    JobSeekersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
