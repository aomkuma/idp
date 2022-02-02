import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  callHTTPPost(url, params){
    console.log(localStorage.getItem('token_type'));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
    })   
  
   const req = new HttpRequest('POST', url, params, {
            // reportProgress: true,
            'responseType': 'json',
            'headers' : headers

          });
  return this.http.request(req);
  }

  callHTTPGet(url, params){
    console.log(this.tokenStorage.getToken());
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.tokenStorage.getToken()//localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
    })   
  
   const req = new HttpRequest('GET', url + params, {
            // reportProgress: true,
            'responseType': 'json',
            'headers' : headers

          });
  return this.http.request(req);
  }

  callHTTPDelete(url, params){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
    })   
  
   const req = new HttpRequest('delete', url + params, {
            // reportProgress: true,
            'responseType': 'json',
            'headers' : headers

          });
  return this.http.request(req);
  }
}