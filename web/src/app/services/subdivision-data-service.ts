import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubdivisionDataService {
    baseUrl = 'http://localhost:3000/v1/subdivisions';
  constructor(private http: HttpClient) { }

  getSubDivisionData(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
}
}
