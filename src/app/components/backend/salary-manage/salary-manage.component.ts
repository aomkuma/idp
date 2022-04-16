import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';
import { UploadServiceService } from '../../../services/upload-service.service';
import { TokenStorageService } from '../../../services/token-storage.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-salary-manage',
  templateUrl: './salary-manage.component.html',
  styleUrls: ['./salary-manage.component.scss']
})
export class SalaryManageComponent implements OnInit {

  @Input() personnel_id: string = '';
  update_data: any;
  storage_url : any = environment.fileUrl;
  
  form: FormGroup = new FormGroup({
    id:  new FormControl(''),
    old_salary: new FormControl('', [Validators.required]),
    salary: new FormControl(''),
    percent: new FormControl(''),
  });
  user_data :any;
  DataList = [];
  is_update = false;
  update_id : any = null;
  submitted = false;
  error_message :string = null;

  closeModal: string;

  constructor(private formBuilder: FormBuilder, 
              private modalService: NgbModal,
              private activatedRoute: ActivatedRoute, 
              private httpService: HttpServiceService,
              private uploadService: UploadServiceService,
              private tokenStorage: TokenStorageService
            ) { }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
    this.getSalaryList();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getSalaryList(){
    this.httpService.callHTTPGet('salary/list/', this.personnel_id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.DataList = event['body']['data'];
        }
      }
    );
  }

  updateFile(update_data){
    this.update_data = update_data;
    this.update_id = null;
    if (this.update_data != null) {

      this.update_id = update_data.id;
      this.form = this.formBuilder.group({
                  'id' : update_data.id,
                  'old_salary' : update_data.old_salary,
                  'percent' : update_data.percent,
                  'salary' : update_data.salary,
                });
    } else {
      this.form = this.formBuilder.group({
                  'id' : '',
                  old_salary: new FormControl('', [Validators.required]),
                  salary: new FormControl(''),
                  percent: new FormControl(''),
                });
    }

    this.is_update = true;
  }

  cancelUpdateFile(){
    this.update_id = null;
    this.update_data = null;
    this.is_update = false;
    this.error_message = null;
  }

  onSubmit(){
    if (this.form.invalid) {
      this.error_message = 'กรุณากรอกข้อมูลให้ครบตามที่กำหนด *';
      return;
    }

    this.error_message = null;
    this.submitted = true;

    const formData: FormData = new FormData();

    formData.append('id', this.form.value.id);
    formData.append('user_id', this.personnel_id);
    formData.append('old_salary', this.form.value.old_salary);
    formData.append('salary', this.form.value.salary);
    formData.append('percent', this.form.value.percent);
    formData.append('action_by', this.user_data.email);

    console.log(this.form.value);
    this.uploadService.uploadFile('salary/update', formData).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['id']);
          this.submitted = false;
          this.is_update = false;
          if(this.update_id == null){
            this.DataList.push(event['body']['data']);
          }else{
            this.getSalaryList();
          }
        }
        
      },
      err => {
        this.error_message = err.error.message;
        if(err.error.errors){
          this.error_message = err.error.errors.file[0];
        }
        this.submitted = false;
      });
      
  }

  triggerModal(content, data_id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(res);
      if(res == 'Confirm'){
        
        console.log(data_id);

        this.httpService.callHTTPDelete('salary/destroy/', data_id).subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.getSalaryList();
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

}
