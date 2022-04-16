import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';

import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-admin-ads-manage',
  templateUrl: './admin-ads-manage.component.html',
  styleUrls: ['./admin-ads-manage.component.scss']
})
export class AdminAdsManageComponent implements OnInit {

  list : any = [];
  form: FormGroup = new FormGroup({
    ads_type: new FormControl(''),
    name: new FormControl(''),
  });
  user_data :any;
  submitted = false;
  error_message = null;
  page = 1;
  total_data = 0;
  closeModal : string;

  constructor(private modalService: NgbModal, 
              private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
    this.loadList();
  }

  loadList(){
    this.submitted = true;

    var condition = '';
    if (this.form.value.ads_type != '') {
      condition += '/' + this.form.value.ads_type;
    } 
    // else {
    //   condition += '/';
    // }
    // if (this.form.value.name != '') {
    //   condition += '/' + this.form.value.name;
    // } else {
    //   condition += '/';
    // }

    this.httpService.callHTTPGet('ads', condition).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.list = event['body']['data'];
          this.page = event['body']['current_page'];
          this.total_data = event['body']['total'];
          this.submitted = false;
        }
        
      },
      err => {
        this.submitted = false;
      });
  }

  triggerModal(content, data_id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(res);
      if(res == 'Confirm'){
        
        console.log(data_id);

        this.httpService.callHTTPDelete('ads/destroy/', data_id).subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.loadList();
            }
          }
        );
      }
      
    }, (res) => {
    });
  }

}
