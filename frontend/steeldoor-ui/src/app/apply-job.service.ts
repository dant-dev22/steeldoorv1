// apply-job.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplyJobService {
  private apiUrl = 'http://localhost:5000/api/workers'; // Cambia la URL según tu API

  constructor(private http: HttpClient) { }

  async applyJob(formData: FormData): Promise<any> {
    const response = await firstValueFrom(this.http.post(`${this.apiUrl}/apply`, formData));
    console.log(response, "soy la respuesta")
    return 'Application submitted successfully'
  }
}
