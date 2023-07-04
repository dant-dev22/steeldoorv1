import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
// This service handles all the connection to the server
@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private baseUrl = 'http://localhost:5000/jobs';

  constructor(private http: HttpClient) { }

  async getJobs(): Promise<any> {
    const response = await firstValueFrom(this.http.get(`${this.baseUrl}/list`));
    return response;
  }

  async addWork(workData: any): Promise<any> {
    const response = await firstValueFrom(this.http.post(`${this.baseUrl}/add_work`, workData));
    return response;
  }
  
  async editWork(workId: string, workData: any): Promise<any> {
    const response = await firstValueFrom(this.http.put(`${this.baseUrl}/edit/${workId}`, workData));
    return response;
  }
  
  async deleteWork(workId: string): Promise<any> {
    const response = await firstValueFrom(this.http.delete(`${this.baseUrl}/delete/${workId}`));
    console.log(response, "lina 34")
    return response;
  }

  async applyJob(workId: string, applyFormData: any): Promise<any> {
    const formData = new FormData();
    formData.append('name', applyFormData.name);
    formData.append('email', applyFormData.email);
    if (applyFormData.resume) {
      formData.append('file', applyFormData.resume);
    }
  
    const response = await firstValueFrom(this.http.post(`${this.baseUrl}/apply/${workId}`, formData));
    return response;
  }

  async getWork(workId: string): Promise<any> {
    const response = await firstValueFrom(this.http.get(`${this.baseUrl}/list/${workId}`));
    return response;
  }
}
