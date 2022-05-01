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
  selector: 'app-admin-activity-update-manage',
  templateUrl: './admin-activity-update-manage.component.html',
  styleUrls: ['./admin-activity-update-manage.component.scss']
})
export class AdminActivityUpdateManageComponent implements OnInit {
  
  @ViewChild('modalSuccessData')  modalSuccessData: ElementRef;
  closeModal : string;
  
  storage_url : any = environment.fileUrl;
  id : any;
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    user_id: new FormControl(''),
    personnel_name: new FormControl(''),
    personnel_lastname: new FormControl(''),
    personnel_work_unit: new FormControl(''),
    activity_type:  new FormControl('', Validators.required),
    cost_type:  new FormControl('N', Validators.required),
    source_of_money: new FormControl(''),
    activity_name: new FormControl('', Validators.required),
    organize: new FormControl('', Validators.required),
    participate_date_from: new FormControl('', Validators.required),
    participate_date_to: new FormControl('', Validators.required),

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
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.user_data = this.tokenStorage.getUser().user;
    this.getPersonnelList();
    
  }

  formatter = (x: {name: string, lastname: string}) => x.name + ' ' + x.lastname;
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.personnel_list.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  selectedItem(event){
    // console.log(item.item);
    // this.model = item.name + ' ' + item.lastname;
    this.form.get('user_id').setValue(event.item.id);
    this.form.get('personnel_name').setValue(event.item.name);
    this.form.get('personnel_lastname').setValue(event.item.lastname);
    this.form.get('personnel_work_unit').setValue(event.item.work_unit);
    // event.preventDefault();
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

  getPersonnelList(){
    this.httpService.callHTTPGet('users/', 'N').subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.personnel_list = event['body']['data'];
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
          this.form.get('cost_type').setValue(this.data.cost_type);
          this.form.get('source_of_money').setValue(this.data.source_of_money);
          this.form.get('activity_name').setValue(this.data.activity_name);
          this.form.get('organize').setValue(this.data.organize);
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
    formData.append('user_id', this.form.value.user_id);
    formData.append('personnel_name', this.form.value.personnel_name);
    formData.append('personnel_lastname', this.form.value.personnel_lastname);
    formData.append('personnel_work_unit', this.form.value.personnel_work_unit);
    formData.append('activity_type', this.form.value.activity_type);
    formData.append('cost_type', this.form.value.cost_type);
    formData.append('source_of_money', this.form.value.source_of_money);
    formData.append('activity_name', this.form.value.activity_name);
    formData.append('organize', this.form.value.organize);
    formData.append('participate_date_from', this.form.value.participate_date_from);
    formData.append('participate_date_to', this.form.value.participate_date_to);
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
          this.form.get('cost_type').setValue(this.data.cost_type);
          this.form.get('source_of_money').setValue(this.data.source_of_money);
          this.form.get('activity_name').setValue(this.data.activity_name);
          this.form.get('organize').setValue(this.data.organize);
          this.form.get('participate_date_from').setValue(formatDate(this.data.participate_date_from, 'yyyy-MM-dd', 'en'));
          this.form.get('participate_date_to').setValue(formatDate(this.data.participate_date_to, 'yyyy-MM-dd', 'en'));
          this.submitted = true;

          this.modalService.open(this.modalSuccessData, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
            this.closeModal = `Closed with: ${res}`;
            console.log(res);
            if(res == 'Confirm'){
              this.router.navigate(['/admin-activity-management']);
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
    this.router.navigate(['/admin-activity-management']);
  }

}
