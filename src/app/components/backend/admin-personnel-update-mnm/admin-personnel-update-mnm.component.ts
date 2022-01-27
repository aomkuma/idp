import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { HttpServiceService } from '../../../services/http-service.service';
import { UploadServiceService } from '../../../services/upload-service.service';

@Component({
  selector: 'app-admin-personnel-update-mnm',
  templateUrl: './admin-personnel-update-mnm.component.html',
  styleUrls: ['./admin-personnel-update-mnm.component.scss']
})
export class AdminPersonnelUpdateMnmComponent implements OnInit {

  form: FormGroup = new FormGroup({
    prefix: new FormControl('นาย'),
    name: new FormControl(''),
    lastname: new FormControl(''),
    position: new FormControl(''),
    birth_date: new FormControl(''),
    line_work: new FormControl(''),
    position_academic: new FormControl(''),
    promote_budget: new FormControl(''),
    start_date: new FormControl(''),
    personal_file: new FormControl(''),
    supervisor_level_st: new FormControl(''),
    supervisor_level_nd: new FormControl(''),
    supervisor_level_rd: new FormControl(''),
    supervisor_level_th: new FormControl(''),
    agency: new FormControl(''),
    work_unit: new FormControl(''),
    agency_detail: new FormControl(''),
    mobile_work: new FormControl(''),
    mobile_work_internal: new FormControl(''),
    mobile: new FormControl(''),
    email_work: new FormControl(''),
    email: new FormControl(''),
    file: new FormControl(''),
    fileSource: new FormControl('')
    // acceptTerms: new FormControl(false),
  });

  attach_file_data : any;
  id : any;
  progress = 1;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder, 
              private activatedRoute: ActivatedRoute, 
              private httpService: HttpServiceService,
              private uploadService: UploadServiceService
              ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    if(this.id){
      this.progress = 3;
      this.getData(this.id);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      });
    }
  }

  getData(id){
      this.httpService.callHTTPGet('users/get', id).subscribe(
      event => {
        if (event instanceof HttpResponse) {

          this.attach_file_data = {'file_path' : event.body['Data']['personal_file'], 'file_name' : event.body['Data']['file_name']};
          this.form = this.formBuilder.group({
                'id' : event.body['Data']['id'],
                'prefix' : [event.body['Data']['prefix'], Validators.required],
                'name' : [event.body['Data']['name'], Validators.required],
                'lastname' : [event.body['Data']['lastname'], Validators.required],
                'position' : [event.body['Data']['position'], Validators.required],
                'line_work' : [event.body['Data']['line_work'], Validators.required],
                'position_academic' : [event.body['Data']['position_academic'], Validators.required],
                'promote_budget' : [event.body['Data']['promote_budget']],
                'start_date' : [event.body['Data']['start_date']],
                'birth_date' : [event.body['Data']['birth_date']],
                'supervisor_level_st' : [event.body['Data']['supervisor_level_st'], Validators.required],
                'supervisor_level_nd' : [event.body['Data']['supervisor_level_nd']],
                'supervisor_level_rd' : [event.body['Data']['supervisor_level_rd']],
                'supervisor_level_th' : [event.body['Data']['supervisor_level_th']],
                'agency' : [event.body['Data']['agency']],
                'work_unit' : [event.body['Data']['work_unit']],
                'agency_detail' : [event.body['Data']['agency_detail']],
                'mobile_work' : [event.body['Data']['mobile_work']],
                'mobile_work_internal' : [event.body['Data']['mobile_work_internal']],
                'mobile' : [event.body['Data']['mobile'], Validators.required],
                'email_work' : [event.body['Data']['email_work']],
                'email' : [event.body['Data']['email'], Validators.required],
                file: new FormControl(''),
                fileSource: new FormControl('')
              });

          this.progress = 3;

        }
        
      },
      err => {
      });
  }

  nextStep(step:any){
    this.progress = step;
  }

  onSubmit(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formData: FormData = new FormData();

    formData.append('id', this.form.value.id);
    formData.append('prefix', this.form.value.prefix);
    formData.append('name', this.form.value.name);
    formData.append('lastname', this.form.value.lastname);
    formData.append('position', this.form.value.position);
    formData.append('line_work', this.form.value.line_work);
    formData.append('position_academic', this.form.value.position_academic);
    formData.append('promote_budget', this.form.value.promote_budget);
    formData.append('start_date', this.form.value.start_date);
    formData.append('birth_date', this.form.value.birth_date);
    formData.append('supervisor_level_st', this.form.value.supervisor_level_st);
    formData.append('supervisor_level_nd', this.form.value.supervisor_level_nd);
    formData.append('supervisor_level_rd', this.form.value.supervisor_level_rd);
    formData.append('supervisor_level_th', this.form.value.supervisor_level_th);
    formData.append('agency', this.form.value.agency);
    formData.append('work_unit', this.form.value.work_unit);
    formData.append('agency_detail', this.form.value.agency_detail);
    formData.append('mobile_work', this.form.value.mobile_work);
    formData.append('mobile_work_internal', this.form.value.mobile_work_internal);
    formData.append('mobile', this.form.value.mobile);
    formData.append('email_work', this.form.value.email_work);
    formData.append('email', this.form.value.email);
    formData.append('file', this.form.get('fileSource').value);

    // this.httpService.callHTTPPost('users/update', this.form.value).subscribe(
    this.uploadService.uploadFile('users/update', formData).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          // localStorage.setItem('user_data', JSON.stringify(event));
          console.log(event['body']['id']);
          this.id = event['body']['id'];
          this.attach_file_data = {'file_path' : event['body']['personal_file'], 'file_name' : event['body']['file_name']};
          
          this.submitted = false;
          // this.progress = 3;
        }
        
      },
      err => {
        // this.progressInfos[idx].value = 0;
        this.submitted = false;
      });
    
    console.log(JSON.stringify(this.form.value, null, 2));
  }

}