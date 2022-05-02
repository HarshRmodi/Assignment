import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Interest } from '../business/interest/interest';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  apiUrl: string = 'http://localhost:3000/employees';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  createEmployeeInterest(data: Interest): Observable<any> {
    // let API_URL = `${this.apiUrl};
    return this.http.post(this.apiUrl, data).pipe(catchError(this.error));
  }

  // Get
  getEmployeeInterestList(search: string) {
    return this.http.get(`${this.apiUrl}?q=${search}`);
  }

  getEmployeeInterestListPaginated(pageNo: number, limit: number, search: string, cname: string, otype: string) {
    return this.http.get(`${this.apiUrl}?_page=${pageNo}&_limit=${limit}&q=${search}&_sort=${cname}&_order=${otype}`);
  }


  // Update
  updateEmployeeInterest(id: any, data: Interest): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  // Delete
  deleteEmployeeInterest(id: any): Observable<any> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.error));
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
