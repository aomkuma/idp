import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';

import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss']
})
export class NotificationBoxComponent implements OnInit {

  NotificationList : any = [];
  user_data : any;
  constructor(private modalService: NgbModal,
              private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
    this.loadNotificationList(this.user_data.id);
  }

  loadNotificationList(user_id){
    this.httpService.callHTTPGet('notification/by-user/', user_id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.NotificationList = event['body']['data'];
          // this.submitted = false;
        }
        
      },
      err => {
        // this.submitted = false;
      });
  }

}
