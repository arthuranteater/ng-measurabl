import { Injectable} from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl= 'http://5c37c33f7820ff0014d927c5.mockapi.io/msr/';
  errorMessage = ""

  constructor(private http: HttpClient) {}

  //error handler
  private handleError(error: HttpErrorResponse) {
    let message: string = 'error';
    if (error.status === 0) {
      console.error(`A client-side or network error occurred: ${error.error}`);
      message = `A client-side or network error occurred: ${error.error}`;
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
      message = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    this.errorMessage = message
    return throwError(message);
  }

  //requests
  getRecords(endpoint: string): Observable<object> {
    const apiUrl = this.baseUrl + endpoint;
    console.log(`calling ${apiUrl}`)
    return this.http.get(apiUrl).pipe(
      tap(
        (data) => {
          // console.log(`Data from ${endpoint}`, data);
        },
        (err) => {
          console.log(`Error from ${endpoint}`, err);
          throwError(err);
        },
        () => console.log('completed')
      ),
      catchError(this.handleError)
    );
  };
}
