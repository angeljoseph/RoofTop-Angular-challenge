import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'assets/data/patientData.json';  // API endpoint

  constructor(private http: HttpClient) {}

  // GET method to fetch patient data using Basic Auth
  getPatientsData(): Observable<any> {
    // Base64 encoding of 'coalition:skills-test' (username:password)
    
    // Perform GET request and return the observable
    return this.http.get<any>(this.apiUrl);
  }
}
