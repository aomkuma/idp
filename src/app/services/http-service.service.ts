import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost/api/';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  callHTTPPost(url, params){
    console.log(localStorage.getItem('token_type'));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
    })   
  
   const req = new HttpRequest('POST', API + url, params, {
            // reportProgress: true,
            'responseType': 'json',
            'headers' : headers

          });
  return this.http.request(req);
  }

  callHTTPGet(url, params){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
    })   
  
   const req = new HttpRequest('GET', API + url + '/' + params, {
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
  
   const req = new HttpRequest('delete', API + url + params, {
            // reportProgress: true,
            'responseType': 'json',
            'headers' : headers

          });
  return this.http.request(req);
  }
}