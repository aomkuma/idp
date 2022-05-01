import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';
import { UploadServiceService } from '../../../services/upload-service.service';

import { TokenStorageService } from '../../../services/token-storage.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-supervisor-evaluate-person-list',
  templateUrl: './supervisor-evaluate-person-list.component.html',
  styleUrls: ['./supervisor-evaluate-person-list.component.scss']
})
export class SupervisorEvaluatePersonListComponent implements OnInit {
  id : any;
  evaluate_status : any;
  list : any = [];
  fiscal_year_ist: any = []; 
  form: FormGroup = new FormGroup({
    evaluate_status: new FormControl(''),
    name: new FormControl(''),
  });
  user_data :any;
  submitted = false;
  error_message = null;
  page = 1;
  total_data = 0;
  closeModal : string;

  constructor(private activatedRoute: ActivatedRoute, 
              private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService,
              private uploadService: UploadServiceService,
              private router : Router) { }

  ngOnInit(): void {
    this.evaluate_status = this.activatedRoute.snapshot.paramMap.get('status');
    if (this.evaluate_status) {
      this.form.get('evaluate_status').setValue(this.evaluate_status);
    }
    this.loadList();
  }
  
  loadList(){
    this.submitted = true;

    var condition = '';
    if (this.form.value.evaluate_status != '') {
      condition += '/' + this.form.value.evaluate_status;
    } else {
      condition += '/';
    }
    if (this.form.value.name != '') {
      condition += '/' + this.form.value.name;
    }/* else {
      condition += '/';
    }*/

    this.httpService.callHTTPGet('supervisor-dashboard', condition).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']['data']);
          this.list = event['body']['data']['data'];
          this.page = event['body']['data']['current_page'];
          this.total_data = event['body']['data']['total'];
          this.submitted = false;
        }
        
      },
      err => {
        this.submitted = false;
      });
  }

  getStatusName(status) {
    switch (status) { 
      case -1 : return 'กำลังทำแบบประเมิน'; break;
      case 0 : return 'รอตรวจสอบ'; break;
      case 1 : return 'รอตรวจสอบ'; break;
      case 2 : return 'รอประเมินพฤติกรรม'; break;
      case 3 : return 'รอตรวจสอบ'; break;
      case 4 : return 'รอประเมินพฤติกรรม'; break;
      case 5 : return 'รอตรวจสอบ'; break;
      case 6 : return 'รอประเมินพฤติกรรม'; break;
      case 7 : return 'รอตรวจสอบ'; break;
      case 8 : return 'รอประเมินพฤติกรรม'; break;
      case 99 : return 'แก้ไขข้อมูล'; break;
    }
  }

}
