import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from './../service/model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private orderUrl = 'https://scrappy-kevin.herokuapp.com/buscar/';

  constructor(private http: HttpClient) { }

  getVideos(name): Observable<Song[]>{
    return this.http.get<Song[]>(`${this.orderUrl}` + name);
  }

  
  private handleError(err: HttpErrorResponse) {
    // tslint:disable-next-line:no-console
    console.log(err.message);
    return Observable.throw(err.message);
  }

}
