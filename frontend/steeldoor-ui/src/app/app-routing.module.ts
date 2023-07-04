import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobSeekersComponent } from "./job-seekers/job-seekers.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: JobsComponent },
  { path: 'job-seekers', component: JobSeekersComponent },
  { path: '**', component: HomeComponent } // go back to home if there is an unknown call
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
