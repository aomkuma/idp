import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';

import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  list : any = [];
  fiscal_year_list: any = [];
  current_year = null;
  fiscal_year : any = '';
  user_data : any;
  submitted = false;

  constructor(private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    var current_date = new Date();
    var current_year = current_date.getFullYear();
    this.fiscal_year = current_year;
    for (var i = -1; i <= 20; i++) {
      this.fiscal_year_list.push({ 'text' : ((current_year + i) + 543), 'value' : (current_year + i) });
    }

    this.user_data = this.tokenStorage.getUser().user;
    this.loadList(this.fiscal_year);

  }

  loadList(fiscal_year){
    this.submitted = true;
    this.httpService.callHTTPGet('evaluate/admin/summary/', fiscal_year).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.list = event['body']['data'];
          this.submitted = false;
        }
        
      },
      err => {
        this.submitted = false;
      });
  }

}
