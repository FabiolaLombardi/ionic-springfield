import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the HttpRequestProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpRequestProvider {

  // url: string = 'https://thesimpsonsquoteapi.glitch.me/quotes?count='+this.num;
  url: string = 'https://thesimpsonsquoteapi.glitch.me/quotes?count';

  constructor(public http: HttpClient) {
    console.log('Hello HttpRequestProvider Provider');
  }
/*
  getCharacters(): Observable<any>{
    return this.http.get<any>(`${this.url}`);

  }
*/
  getCharacters(num):Observable<any>{
    return this.http.get<any>(`${this.url}=${num}`);
  }

  }

