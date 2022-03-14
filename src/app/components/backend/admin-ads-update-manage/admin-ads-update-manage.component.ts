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
  selector: 'app-admin-ads-update-manage',
  templateUrl: './admin-ads-update-manage.component.html',
  styleUrls: ['./admin-ads-update-manage.component.scss']
})
export class AdminAdsUpdateManageComponent implements OnInit {

  storage_url : any = environment.fileUrl;
  id : any;
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    ads_name: new FormControl('', Validators.required),
    ads_detail: new FormControl(''),
    ads_type: new FormControl('ประกาศทั่วไป', Validators.required),
    start_date: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required),
    user_id: new FormControl(''),
    personnel_name: new FormControl(''),
    file: new FormControl(''),
    fileSource: new FormControl(''),

  });
  personnel_list : any;
  states : any;
  model: any;
  user_data :any;
  data: any;
  submitted = false;
  error_message = null;
  
  constructor(private activatedRoute: ActivatedRoute, 
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
    console.log(this.search);
    this.form.get('user_id').setValue(event.item.id);
    this.form.get('personnel_name').setValue(event.item.name + ' ' + event.item.lastname);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
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
    this.httpService.callHTTPGet('ad/get/', id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.data = event['body']['data'];
          this.form.get('id').setValue(this.data.id);
          this.form.get('ads_name').setValue(this.data.ads_name);
          this.form.get('ads_detail').setValue(this.data.ads_detail);
          this.form.get('ads_type').setValue(this.data.ads_type);
          this.form.get('start_date').setValue(formatDate(this.data.start_date, 'yyyy-MM-dd', 'en'));
          this.form.get('end_date').setValue(formatDate(this.data.end_date, 'yyyy-MM-dd', 'en'));
          this.form.get('personnel_name').setValue(this.data.personnel_name);
          this.form.get('user_id').setValue(this.data.user_id);
          this.model.value = this.data.personnel_name;
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
    formData.append('ads_name', this.form.value.ads_name);
    formData.append('ads_detail', this.form.value.ads_detail);
    formData.append('ads_type', this.form.value.ads_type);
    formData.append('start_date', this.form.value.start_date);
    formData.append('end_date', this.form.value.end_date);
    formData.append('user_id', this.form.value.user_id);
    formData.append('personnel_name', this.form.value.personnel_name);
    formData.append('file', this.form.get('fileSource').value);
    formData.append('action_by', this.user_data.email);

    console.log(this.form.value);
    this.uploadService.uploadFile('ads/update', formData).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.data = event['body']['data'];
          this.form.get('id').setValue(this.data.id);
          this.form.get('ads_name').setValue(this.data.ads_name);
          this.form.get('ads_detail').setValue(this.data.ads_detail);
          this.form.get('ads_type').setValue(this.data.ads_type);
          this.form.get('start_date').setValue(formatDate(this.data.start_date, 'yyyy-MM-dd', 'en'));
          this.form.get('end_date').setValue(formatDate(this.data.end_date, 'yyyy-MM-dd', 'en'));
          this.form.get('personnel_name').setValue(this.data.personnel_name);
          this.form.get('user_id').setValue(this.data.user_id);
          this.submitted = false;
        }
        
      },
      err => {
        this.submitted = false;
      });
  }

  goBack() {
    this.router.navigate(['/admin-ads-management']);
  }

}
