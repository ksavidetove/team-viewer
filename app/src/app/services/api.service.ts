import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {throwError} from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  listTeams(leagueName: string) {
    const url = environment.apiUrl + 'league/' + leagueName;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  listPlayers(leagueName: string) {
    const url = environment.apiUrl + 'team/' + leagueName;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  private handleError (error: HttpErrorResponse | any) {
    console.log(error.message || error);
    return throwError(error.message || error);
  }
}
