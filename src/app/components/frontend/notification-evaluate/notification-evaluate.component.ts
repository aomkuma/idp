import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';

import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-notification-evaluate',
  templateUrl: './notification-evaluate.component.html',
  styleUrls: ['./notification-evaluate.component.scss']
})
export class NotificationEvaluateComponent implements OnInit {
  submitted : any;
  evaluate_status_list : any = [];
  user_data : any;
  
  constructor(private modalService: NgbModal,
              private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
    this.loadEvaluateStatusList(this.user_data.id);
  }

  loadEvaluateStatusList(user_id){
    this.submitted = true;
    this.httpService.callHTTPGet('evaluate/summary/', user_id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.evaluate_status_list = event['body']['data'];
          this.submitted = false;
        }
        
      },
      err => {
        this.submitted = false;
      });
  }
}
