import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';

import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('modalAdsData')  modalAdsData: ElementRef;
  closeModal : string;

  constructor(private modalService: NgbModal,
              private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    console.log(this.tokenStorage.getAds());
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
  }

}
