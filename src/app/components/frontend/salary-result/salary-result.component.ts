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
  selector: 'app-salary-result',
  templateUrl: './salary-result.component.html',
  styleUrls: ['./salary-result.component.scss']
})
export class SalaryResultComponent implements OnInit {

  @ViewChild('modalSuccessData')  modalSuccessData: ElementRef;
  @ViewChild('modalConfirmData')  modalConfirmData: ElementRef;
  closeModal : string;
  user_id :any;
  user_data : any;
  evaluate_form_id :any;
  salary_data :any;
  admin_data :any;
  error_message :any;
  submitted :boolean= false;
  
  constructor(private modalService: NgbModal,
              private activatedRoute: ActivatedRoute, 
              private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService,
              private uploadService: UploadServiceService,
              private formBuilder: FormBuilder, 
              private router : Router) { }

  ngOnInit(): void {
    this.user_id = this.activatedRoute.snapshot.paramMap.get('user_id');
    this.evaluate_form_id = this.activatedRoute.snapshot.paramMap.get('form_id');
    this.admin_data = this.tokenStorage.getUser().user;
    this.getUserSalaryDetail();
  }

  getUserSalaryDetail() {
    this.httpService.callHTTPGet('personnel/salary/detail/', this.user_id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.salary_data = event.body['salary_data'];
          this.user_data = event.body['user_data'];
          
        }
      },
      err => {
        // this.submitted = false;
      });
  }

  calcNewSalary() {
    if (this.salary_data.percent == null) {
      this.salary_data.percent = 0;
    }
    var up_salary = (parseFloat(this.salary_data.old_salary) * this.salary_data.percent) / 100;
    this.salary_data.salary = parseFloat(this.salary_data.old_salary) + up_salary;
  }

  calcNewPercent() {
    var up_salary = this.salary_data.salary - parseFloat(this.salary_data.old_salary);
    this.salary_data.percent = (up_salary / parseFloat(this.salary_data.old_salary)) * 100;
  }

  saveData() {
    this.modalService.open(this.modalConfirmData, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(res);
      if(res == 'Confirm'){
        this.salary_data.updated_by = this.admin_data.email;
        this.salary_data['evaluate_form_id'] = this.evaluate_form_id;
        this.httpService.callHTTPPost('personnel/salary/up/confirm', this.salary_data).subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.modalService.open(this.modalSuccessData, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
                this.closeModal = `Closed with: ${res}`;
                console.log(res);
                if(res == 'Confirm'){
                  this.router.navigate(['/dashboard']);
                }
                
              }, (res) => {
                
              });
            }
          },
          err => {
            this.error_message = err;
            // this.submitted = false;
          });
      }else {

      }
    
    }, (res) => {
      
    });
    
  }

}
