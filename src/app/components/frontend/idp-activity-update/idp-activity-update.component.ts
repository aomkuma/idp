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
  selector: 'app-idp-activity-update',
  templateUrl: './idp-activity-update.component.html',
  styleUrls: ['./idp-activity-update.component.scss']
})
export class IdpActivityUpdateComponent implements OnInit {

  @ViewChild('modalSuccessData')  modalSuccessData: ElementRef;
  closeModal : string;
  
  storage_url : any = environment.fileUrl;
  id : any;
  idp_name : any;
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    user_id: new FormControl(''),
    personnel_name: new FormControl(''),
    personnel_lastname: new FormControl(''),
    personnel_work_unit: new FormControl(''),
    idp_activity_type:  new FormControl('', Validators.required),
    activity_type:  new FormControl('', Validators.required),
    activity_idp_name: new FormControl('', Validators.required),
    participate_date_from: new FormControl('', Validators.required),
    participate_date_to: new FormControl('', Validators.required),
    activity_category: new FormControl('idp'),
    file1: new FormControl(''),
    fileSource1: new FormControl(''),

    file2: new FormControl(''),
    fileSource2: new FormControl(''),

    file3: new FormControl(''),
    fileSource3: new FormControl(''),

    file4: new FormControl(''),
    fileSource4: new FormControl(''),

    file5: new FormControl(''),
    fileSource5: new FormControl(''),

  });
  personnel_list : any;
  master_idp_list : any = [];
  states : any;
  model: any;
  data : any = {'id' : '', 'file_path_1' : '', 'file_path_2' : '', 'file_path_3' : '', 'file_path_4' : '', 'file_path_5' : '', 
                'file_name_1' : '', 'file_name_2' : '', 'file_name_3' : '', 'file_name_4' : '', 'file_name_5' : ''};
  user_data :any;
  submitted = false;
  error_message = null;
  
  constructor(private modalService: NgbModal,
              private activatedRoute: ActivatedRoute, 
              private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService,
              private uploadService: UploadServiceService,
              private router : Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('activity_id');
    this.idp_name = this.activatedRoute.snapshot.paramMap.get('idp_name');
    this.form.get('idp_activity_type').setValue(this.idp_name);
    this.user_data = this.tokenStorage.getUser().user;
    this.getMasterIdpList();
    
    
  }

  onFileChange1(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource1: file
      });
    }
  }

  onFileChange2(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource2: file
      });
    }
  }

  onFileChange3(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource3: file
      });
    }
  }

  onFileChange4(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource4: file
      });
    }
  }

  onFileChange5(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource5: file
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getMasterIdpList() {
    this.httpService.callHTTPGet('master-idp/list', '').subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.master_idp_list = event['body']['data'];
          if (this.id) {
            this.getDetail(this.id);
          }
        }
      },
      err => {
        
      });
    
  }

  getDetail(id){
    this.httpService.callHTTPGet('activity/get/', id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.data = event['body']['data'];
          // console.log(this.data.personnel_name + ' ' + this.data.personnel_lastname);
          this.model = this.data.personnel_name + ' ' + this.data.personnel_lastname;
          this.form.get('id').setValue(this.data.id);
          this.form.get('user_id').setValue(this.data.user_id);
          this.form.get('personnel_name').setValue(this.data.personnel_name);
          this.form.get('personnel_lastname').setValue(this.data.personnel_lastname);
          this.form.get('personnel_work_unit').setValue(this.data.personnel_work_unit);
          this.form.get('activity_type').setValue(this.data.activity_type);
          this.form.get('idp_activity_type').setValue(this.data.idp_activity_type);
          this.form.get('activity_idp_name').setValue(this.data.activity_idp_name);
          this.form.get('activity_category').setValue(this.data.activity_category);
          this.form.get('participate_date_from').setValue(formatDate(this.data.participate_date_from, 'yyyy-MM-dd', 'en'));
          this.form.get('participate_date_to').setValue(formatDate(this.data.participate_date_to, 'yyyy-MM-dd', 'en'));
        }
      },
      err => {
        
      });
  }

  onSubmit(){
    this.error_message = null;
    this.submitted = true;

    if (this.form.invalid) {
      this.error_message = 'กรุณากรอกข้อมูลให้ครบตามที่กำหนด *';
      this.submitted = false;
      return;
    }

    const formData: FormData = new FormData();

    formData.append('id', this.form.value.id);
    formData.append('user_id', this.user_data.id);
    formData.append('personnel_name', this.user_data.name);
    formData.append('personnel_lastname', this.user_data.name);
    formData.append('personnel_work_unit', this.user_data.work_unit);
    formData.append('activity_type', this.form.value.activity_type);
    formData.append('idp_activity_type', this.form.value.idp_activity_type);
    formData.append('activity_idp_name', this.form.value.activity_idp_name);
    formData.append('participate_date_from', this.form.value.participate_date_from);
    formData.append('participate_date_to', this.form.value.participate_date_to);
    formData.append('activity_category', this.form.value.activity_category);
    formData.append('file1', this.form.get('fileSource1').value);
    formData.append('file2', this.form.get('fileSource2').value);
    formData.append('file3', this.form.get('fileSource3').value);
    formData.append('file4', this.form.get('fileSource4').value);
    formData.append('file5', this.form.get('fileSource5').value);
    
    formData.append('action_by', this.user_data.email);

    console.log(this.form.value);
    this.uploadService.uploadFile('activity/update', formData).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.data = event['body']['data'];
          this.model = this.data.personnel_name + ' ' + this.data.personnel_lastname;
          this.form.get('id').setValue(this.data.id);
          this.form.get('user_id').setValue(this.data.user_id);
          this.form.get('personnel_name').setValue(this.data.personnel_name);
          this.form.get('personnel_lastname').setValue(this.data.personnel_lastname);
          this.form.get('personnel_work_unit').setValue(this.data.personnel_work_unit);
          this.form.get('activity_type').setValue(this.data.activity_type);
          this.form.get('idp_activity_type').setValue(this.data.idp_activity_type);
          this.form.get('activity_idp_name').setValue(this.data.activity_idp_name);
          this.form.get('activity_category').setValue(this.data.activity_category);
          this.form.get('participate_date_from').setValue(formatDate(this.data.participate_date_from, 'yyyy-MM-dd', 'en'));
          this.form.get('participate_date_to').setValue(formatDate(this.data.participate_date_to, 'yyyy-MM-dd', 'en'));
          this.submitted = false;

          this.modalService.open(this.modalSuccessData, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
            this.closeModal = `Closed with: ${res}`;
            console.log(res);
            if(res == 'Confirm'){
              // this.router.navigate(['/dashboard']);
              this.router.navigate(['/dashboard']);
            }
            
          }, (res) => {
            
          });
          // this.goBack();
        }
        
      },
      err => {
        this.submitted = false;
      });
  }

  goBack() {
    this.router.navigate(['/idp-activities', this.user_data.id]);
  }

}
