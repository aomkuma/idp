import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {

  constructor(private http: HttpClient) { }

  uploadFile(url : string, formData : FormData): Observable<HttpEvent<any>> {

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  upload(file: File, portfolio_id : string): Observable<HttpEvent<any>> {
    
    const user_data = JSON.parse(localStorage.getItem('user_data'));

    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('user_id', user_data.id);
    formData.append('portfolio_id', portfolio_id);
    formData.append('folder', user_data.email);

    const req = new HttpRequest('POST', 'portfolio/upload', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deleteFile(id): Observable<HttpEvent<any>> {
    
    const req = new HttpRequest('DELETE', 'portfolio/delete-file/' + id, [], {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(portfolio_id): Observable<any> {
    return this.http.get('portfolio/get-files/' + portfolio_id);
  }

  /// User Profile Avatar Zone

  uploadAvatar(file: File, user_id : string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    formData.append('file', file);
    formData.append('user_id', user_data.id);
    formData.append('folder', user_data.email);

    const req = new HttpRequest('POST', 'users/avatar/upload', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deleteAvatar(id): Observable<HttpEvent<any>> {
    
    const req = new HttpRequest('DELETE', 'users/avatar/delete/' + id, [], {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getAvatar(user_id): Observable<any> {
    return this.http.get('users/avatar/get/' + user_id);
  }
}