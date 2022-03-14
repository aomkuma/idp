import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpServiceService } from '../../../services/http-service.service';
import { UploadServiceService } from '../../../services/upload-service.service';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-personnel-contact-update',
  templateUrl: './personnel-contact-update.component.html',
  styleUrls: ['./personnel-contact-update.component.scss']
})
export class PersonnelContactUpdateComponent implements OnInit {

  form: FormGroup = new FormGroup({
    id:  new FormControl(''),
    mobile_work: new FormControl(''),
    mobile_work_internal: new FormControl(''),
    mobile: new FormControl(''),
    email_work: new FormControl(''),
    email: new FormControl(''),
    file: new FormControl(''),
  });
  user_data :any;
  submitted = false;
  error_message : any;
  
  constructor(private formBuilder: FormBuilder, 
              private activatedRoute: ActivatedRoute, 
              private httpService: HttpServiceService,
              private uploadService: UploadServiceService,
              private tokenStorage: TokenStorageService,
              private router : Router
              ) { }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
    this.getData(this.user_data.id);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getData(id){
      this.httpService.callHTTPGet('user/get/', id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
              this.form = this.formBuilder.group({
                'id' : event.body['Data']['id'],
                'mobile_work' : [event.body['Data']['mobile_work']],
                'mobile_work_internal' : [event.body['Data']['mobile_work_internal']],
                'mobile' : [event.body['Data']['mobile'], Validators.required],
                'email_work' : [event.body['Data']['email_work']],
                'email' : [event.body['Data']['email'], Validators.required],
              });
        }
        
      },
      err => {
      });
  }

  onSubmit() {
    this.submitted = true;
    this.error_message = null;

    if (this.form.invalid) {
      this.submitted = false;
      this.error_message = 'กรุณาตรวจสอบความถูกต้องและครบถ้วนของข้อมูล';
      console.log(this.error_message);
      return;
    }

    const formData: FormData = new FormData();

    formData.append('id', this.form.value.id);
    formData.append('mobile_work', this.form.value.mobile_work);
    formData.append('mobile_work_internal', this.form.value.mobile_work_internal);
    formData.append('mobile', this.form.value.mobile);
    formData.append('email_work', this.form.value.email_work);
    formData.append('email', this.form.value.email);
    formData.append('action_by', this.user_data.email);

    this.uploadService.uploadFile('user/update/contact', formData).subscribe(
      event => {
        
        if (event instanceof HttpResponse) {
          console.log(event['body']['id']);
          this.submitted = false;
          this.goBack();
        }
        
      },
      err => {
        this.error_message = err.error.message;
        this.submitted = false;
      });
    
  }

  goBack() {
    this.router.navigate(['/personnel-info']);
  }
}
