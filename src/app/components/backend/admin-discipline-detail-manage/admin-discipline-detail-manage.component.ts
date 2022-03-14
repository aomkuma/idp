import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';

import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-admin-discipline-detail-manage',
  templateUrl: './admin-discipline-detail-manage.component.html',
  styleUrls: ['./admin-discipline-detail-manage.component.scss']
})
export class AdminDisciplineDetailManageComponent implements OnInit {

  id : any;
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    personnel_prefix: new FormControl({value: '', disabled: true}), 
    personnel_name: new FormControl({value: '', disabled: true}),
    personnel_lastname: new FormControl({value: '', disabled: true}),
    personnel_work_unit: new FormControl({value: '', disabled: true}),
    personnel_position: new FormControl({value: '', disabled: true}),
    discipline_date_str : new FormControl({value: '', disabled: true}),
    late_time:  new FormControl(''),
    discipline_status: new FormControl(''),
    remark: new FormControl(''),
  });
  data : any;
  user_data :any;
  submitted = false;
  error_message = null;
  
  constructor(private activatedRoute: ActivatedRoute, 
              private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService,
              private router : Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.user_data = this.tokenStorage.getUser().user;
    this.getDetail(this.id);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getDetail(id){
    this.httpService.callHTTPGet('discipline/get/', id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.data = event['body']['data'];
          this.form.get('id').setValue(this.data.id);
          this.form.get('personnel_prefix').setValue(this.data.personnel_prefix);
          this.form.get('personnel_name').setValue(this.data.personnel_name);
          this.form.get('personnel_lastname').setValue(this.data.personnel_lastname);
          this.form.get('personnel_work_unit').setValue(this.data.personnel_work_unit);
          this.form.get('personnel_position').setValue(this.data.personnel_position);
          this.form.get('discipline_date_str').setValue(this.getThaiDate(this.data.discipline_date));
          this.form.get('discipline_status').setValue(this.data.discipline_status);
          this.form.get('remark').setValue(this.data.remark);
          this.form.get('late_time').setValue(JSON.parse(this.data.late_time));
        }
      },
      err => {
        
      });
  }

  onSubmit(){
    this.submitted = true;
    this.httpService.callHTTPPost('discipline/detail/update', {'data' : this.form.value, 'action_by' : this.user_data.email}).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.submitted = false;
        }
        
      },
      err => {
        this.submitted = false;
      });
  }

  goBack() {
    this.router.navigate(['/admin-discipline-management']);
  }

  getThaiDate(date){
    var date_arr = date.split('-');
    var year = parseInt(date_arr[0]) + 543;
    var month = parseInt(date_arr[1]);
    var month_txt = '';
    var day = parseInt(date_arr[2]);

    switch (month) {
      case 1 : month_txt = 'มกราคม';break;
        case 2 : month_txt = 'กุมภาพันธ์';break;
        case 3 : month_txt = 'มีนาคม';break;
        case 4 : month_txt = 'เมษายน';break;
        case 5 : month_txt = 'พฤษภาคม';break;
        case 6 : month_txt = 'มิถุนายน';break;
        case 7 : month_txt = 'กรกฎาคม';break;
        case 8 : month_txt = 'สิงหาคม';break;
        case 9 : month_txt = 'กันยายน';break;
        case 10 : month_txt = 'ตุลาคม';break;
        case 11 : month_txt = 'พฤศจิกายน';break;
        case 12 : month_txt = 'ธันวาคม';break;
    }

    var date_str = day + ' ' + month_txt + ' ' + year;
    // console.log(date_str);
    return date_str;
  }

}
