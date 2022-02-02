import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';

import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-admin-evaluate-round-mnm',
  templateUrl: './admin-evaluate-round-mnm.component.html',
  styleUrls: ['./admin-evaluate-round-mnm.component.scss']
})
export class AdminEvaluateRoundMnmComponent implements OnInit {

  list : any = [];
  fiscal_year_ist: any = []; 
  fiscal_year_update_list: any = []; 
  current_year = null;
  form: FormGroup = new FormGroup({
    fiscal_year: new FormControl(''),
    round_of_year: new FormControl(''),
  });

  update_form: FormGroup = new FormGroup({
    id:  new FormControl(''),
    fiscal_year: new FormControl('', Validators.required),
    round_of_year: new FormControl('', Validators.required),
    start_date: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required),
    start_send_date: new FormControl('', Validators.required),
    end_send_date: new FormControl('', Validators.required),
  });
  user_data :any;
  submitted = false;
  submitted_update = false;
  error_message = null;
  page = 1;
  total_data = 0;
  closeModal : string;
 
  constructor(private modalService: NgbModal, 
              private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    this.user_data = this.tokenStorage.getUser().user;

    var current_date = new Date();
    var current_year = current_date.getFullYear();
    this.current_year = current_date.getFullYear();

    for (var i = -7; i <= 1; i++) {
      this.fiscal_year_ist.push({ 'text' : ((current_year + i) + 543), 'value' : (current_year + i) });
    }

    for (var i = -1; i <= 20; i++) {
      this.fiscal_year_update_list.push({ 'text' : ((this.current_year + i) + 543), 'value' : (this.current_year + i) });
    }
    this.loadList();
  }

  loadList(){
      this.submitted = true;
      this.httpService.callHTTPGet('evaluate-round', '').subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']);
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

  onSubmit(){
    this.submitted = true;

    var condition = '';
    if (this.form.value.fiscal_year != '') {
      condition += '/' + this.form.value.fiscal_year;
    } else {
      condition += '/';
    }
    if (this.form.value.round_of_year != '') {
      condition += '/' + this.form.value.round_of_year;
    } else {
      condition += '/';
    }

    this.httpService.callHTTPGet('evaluate-round', condition).subscribe(
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

  triggerModalUpdate(content, data) {

    if (data == null) {
      this.update_form.get('fiscal_year').setValue(this.current_year.toString());
      this.update_form.get('id').setValue('');
      this.update_form.get('round_of_year').setValue('');
      this.update_form.get('start_date').setValue('');
      this.update_form.get('end_date').setValue('');
      this.update_form.get('start_send_date').setValue('');
      this.update_form.get('end_send_date').setValue('');
    } else {
      this.update_form.get('id').setValue(data.id);
      this.update_form.get('fiscal_year').setValue(data.fiscal_year);
      this.update_form.get('round_of_year').setValue(data.round_of_year);
      this.update_form.get('start_date').setValue(formatDate(data.start_date, 'yyyy-MM-dd', 'en'));
      this.update_form.get('end_date').setValue(formatDate(data.end_date, 'yyyy-MM-dd', 'en'));
      this.update_form.get('start_send_date').setValue(formatDate(data.start_send_date, 'yyyy-MM-dd', 'en'));
      this.update_form.get('end_send_date').setValue(formatDate(data.end_send_date, 'yyyy-MM-dd', 'en'));
    }

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(res);
      if(res == 'Confirm'){

      }
      
    }, (res) => {
      // this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  triggerModal(content, data_id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(res);
      if(res == 'Confirm'){
        
        console.log(data_id);

        this.httpService.callHTTPDelete('evaluate-round/destroy/', data_id).subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.onSubmit();
            }
          }
        );
      }
      
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  get fUpdate(): { [key: string]: AbstractControl } {
    return this.update_form.controls;
  }

  onSubmitUpdate(){
    this.error_message = null;
    this.submitted_update = true;
    console.log(this.update_form.value);
    if (this.update_form.invalid) {
      this.submitted_update = false;
      this.error_message = 'กรุณาตรวจสอบความถูกต้องและครบถ้วนของข้อมูล';
      return;
    } else if (this.update_form.value.start_date > this.update_form.value.end_date) {
      this.error_message = 'กรุณาตรวจสอบข้อมูลช่วงเวลา';
      return;
    } else if (this.update_form.value.start_send_date > this.update_form.value.end_send_date) {
      this.error_message = 'กรุณาตรวจสอบข้อมูลวันที่รับส่งข้อมูล';
      return;
    }

    this.httpService.callHTTPPost('evaluate-round/update', {'data' : this.update_form.value, 'action_by' : this.user_data.email}).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.onSubmit();
          this.submitted_update = false;
          this.modalService.dismissAll();
        }
        
      },
      err => {
        this.error_message = err.error.message;
        this.submitted_update = false;
    });
  }

}
