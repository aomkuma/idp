import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { HttpServiceService } from '../../../services/http-service.service';
import { UploadServiceService } from '../../../services/upload-service.service';
import { TokenStorageService } from '../../../services/token-storage.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-personnel-info',
  templateUrl: './personnel-info.component.html',
  styleUrls: ['./personnel-info.component.scss']
})
export class PersonnelInfoComponent implements OnInit {

  storage_url : any = environment.fileUrl;
  attach_files : any = [{'personnel_files' : []}, {'education_files' : []}, {'work_info_files' : []}];
  form: FormGroup = new FormGroup({
    id:  new FormControl(''),
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
    unit_name: new FormControl(''),
    agency_detail: new FormControl(''),
    mobile_work: new FormControl(''),
    mobile_work_internal: new FormControl(''),
    mobile: new FormControl(''),
    email_work: new FormControl(''),
    email: new FormControl(''),
    file: new FormControl(''),
    fileSource: new FormControl(''),
  });

  user_data :any;
  data :any;
  
  constructor(private formBuilder: FormBuilder, 
              private activatedRoute: ActivatedRoute, 
              private httpService: HttpServiceService,
              private uploadService: UploadServiceService,
              private tokenStorage: TokenStorageService
              ) { }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
    this.getData();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getData(){
      this.httpService.callHTTPGet('user/get/', this.user_data.id + '/Y').subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.attach_files = event.body['Files'];
          this.data = event.body['Data'];
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
                'unit_name': [event.body['Data']['unit_name']],
                'work_unit' : [event.body['Data']['work_unit']],
                'agency_detail' : [event.body['Data']['agency_detail']],
                'mobile_work' : [event.body['Data']['mobile_work']],
                'mobile_work_internal' : [event.body['Data']['mobile_work_internal']],
                'mobile' : [event.body['Data']['mobile'], Validators.required],
                'email_work' : [event.body['Data']['email_work']],
                'email' : [event.body['Data']['email'], Validators.required],
                'file_name' : [event.body['Data']['file_name']],
                'personal_file' : [event.body['Data']['personal_file']],
                file: new FormControl(''),
                fileSource: new FormControl('')
              });

        }
        
      },
      err => {
      });
  }

  calcWorkAge(){
    if(this.attach_files.work_info_files && this.attach_files.work_info_files.length > 0) {
        var date = new Date(this.attach_files.work_info_files[0].hire_date);
        var now = new Date();
        var current_year = now.getFullYear();
        var year_diff = current_year - date.getFullYear();
        var birthday_this_year = new Date(current_year, date.getMonth(), date.getDate());
        var has_had_birthday_this_year = (now >= birthday_this_year);

        return has_had_birthday_this_year
            ? year_diff
            : year_diff - 1;
    }

    return '';
  }

  calcRetireDate(){
    if (this.data) {
      var date = new Date(this.data.birth_date);
      var now = new Date();
      var current_year = now.getFullYear();
      var year_diff = current_year - date.getFullYear();
      var birthday_this_year = new Date(current_year, date.getMonth(), date.getDate());
      var has_had_birthday_this_year = (now >= birthday_this_year);

      var current_age = has_had_birthday_this_year
          ? year_diff
          : year_diff - 1;
      var balance_year = 60 - current_age;
      var retire_year = (current_year + balance_year) + 543;
      return retire_year;
    }
    return '';
  }

}
