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
  selector: 'app-evaluate-form-supervisor',
  templateUrl: './evaluate-form-supervisor.component.html',
  styleUrls: ['./evaluate-form-supervisor.component.scss']
})
export class EvaluateFormSupervisorComponent implements OnInit {
  @ViewChild('modalSuccessData')  modalSuccessData: ElementRef;
  @ViewChild('modalSuccessFinalData')  modalSuccessFinalData: ElementRef;
 closeModal : string;
  
  user_data : any;
  evaluate_form_id :any;
  evaluate_form :any;
  evaluate_status :any;
  data_list :any;
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
    this.evaluate_form_id = this.activatedRoute.snapshot.paramMap.get('form_id');
    this.evaluate_status = this.activatedRoute.snapshot.paramMap.get('status');
    this.admin_data = this.tokenStorage.getUser().user;
    this.getForm();
  }

  getForm() {
    this.httpService.callHTTPGet('supervisor-evaluate/form/', this.evaluate_form_id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.evaluate_form = event.body['evaluate_form'];
          this.data_list = event.body['data_list'];
          this.user_data = event.body['user_data'];
          
        }
        
      },
      err => {
        // this.submitted = false;
      });
  }

  saveData() {
    this.submitted = true;
    const formData: FormData = new FormData();
    formData.append('evaluate_form_id', this.evaluate_form_id);
    formData.append('action_by', this.admin_data.email);
    formData.append('admin_user_id', this.admin_data.id);
    formData.append('supervisor_type', this.admin_data.supervisor_type);
    for (var i = 0; i < this.data_list.length; i++) {
      for (var j = 0; j < this.data_list[i].questions.length; j++) {
        formData.append('answer_id[]', this.data_list[i].questions[j].answer_id?this.data_list[i].questions[j].answer_id:'');
        formData.append('question_id[]', this.data_list[i].questions[j].id);
        if (this.admin_data.supervisor_type == 'หัวหน้าสาขา') {
          formData.append('first_supervisor_answer[]', this.data_list[i].questions[j].first_supervisor_answer);
        } else if (this.admin_data.supervisor_type == 'รองคณบดี') {
          formData.append('second_supervisor_answer[]', this.data_list[i].questions[j].second_supervisor_answer);
        } else if (this.admin_data.supervisor_type == 'รองคณบดีและคณบดี') {
          formData.append('third_supervisor_answer[]', this.data_list[i].questions[j].third_supervisor_answer);
        }
      }
    }

    this.uploadService.uploadFile('supervisor-evaluate/update', formData).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          // console.log(event['body']['id']);
          this.submitted = false;
          if (event['body']['is_finally']) {
            this.modalService.open(this.modalSuccessFinalData, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
              this.closeModal = `Closed with: ${res}`;
              console.log(res);
              if(res == 'Confirm'){
                this.router.navigate(['/salary-result', this.user_data.id, this.evaluate_form_id]);
                
              }
              
            }, (res) => {
              
            });
          } else {
            this.modalService.open(this.modalSuccessData, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
              this.closeModal = `Closed with: ${res}`;
              console.log(res);
              if(res == 'Confirm'){
                this.router.navigate(['/supervisor-evaluate-person-list', this.evaluate_status]);
                
              }
              
            }, (res) => {
              
            });
          }
        }
      },
      err => {
        this.error_message = err.error.message;
        this.submitted = false;
      }
    );
  }

}
