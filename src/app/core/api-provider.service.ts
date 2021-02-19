import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import {map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {
  tokenH = localStorage.getItem('token');
 
  constructor( private http: HttpClient) { }

  loginUrl = 'https://devgroceryapi.spericorn.com/api/auth/login';
  registerUrl = 'https://devgroceryapi.spericorn.com/api/auth/register';
  emailCheck = 'https://devgroceryapi.spericorn.com/api/auth/checkMail';
  getUserApi = 'https://devgroceryapi.spericorn.com/api/user';
  postData(url: any, params: any, ): Observable<string> {
    const headerDict = {
      'Authorization': `Bearer ` + this.tokenH,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    };
    const headers = new HttpHeaders(headerDict);
  
    
    return this.http.post(url, params, {headers: headers}
      ).pipe(
      map((response: any) => {
        return response;
      }),
    )

  }
 
    getData(url: any) {
      console.log(this.tokenH)
      const headerDict = {
        'Authorization': `Bearer ` + this.tokenH,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      };
      const headers = new HttpHeaders(headerDict);
      return this.http.get(url,{headers: headers}
        ).
      pipe(
        map((response: any) => {
          return response;
        }),
        
      );

    }
}
