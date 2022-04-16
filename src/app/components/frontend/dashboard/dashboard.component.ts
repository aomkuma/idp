import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';

import { TokenStorageService } from '../../../services/token-storage.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  storage_url : any = environment.fileUrl;
  @ViewChild('modalAdsData')  modalAdsData: ElementRef;
  closeModal : string;
  user_data : any;
  submitted : any;
  NotificationList : any = [];
  
  constructor(private modalService: NgbModal,
              private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
    
  }

  ngAfterViewInit(): void {
    console.log(this.tokenStorage.getAds());
    this.loadNotificationList();
  }

  loadNotificationList(){
    this.httpService.callHTTPGet('notifications/', this.user_data.id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.NotificationList = event['body']['data'];
          if(this.tokenStorage.getAds() == undefined || this.tokenStorage.getAds() == null) {
            this.modalService.open(this.modalAdsData, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
                this.closeModal = `Closed with: ${res}`;
                console.log(res);
                if(res == 'Confirm'){
                  this.tokenStorage.saveAds('already_view');
                  console.log(this.tokenStorage.getAds());
                }
                
              }, (res) => {
            });
          }
          // this.submitted = false;
        }
        
      },
      err => {
        // this.submitted = false;
      });
  }
}
