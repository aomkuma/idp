import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';
import { UploadServiceService } from '../../../services/upload-service.service';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-admin-academic-file-manage',
  templateUrl: './admin-academic-file-manage.component.html',
  styleUrls: ['./admin-academic-file-manage.component.scss']
})
export class AdminAcademicFileManageComponent implements OnInit {

  @Input() personnel_id: string = '';
  attach_file_data: any;

  form: FormGroup = new FormGroup({
    id:  new FormControl(''),
    hire_date: new FormControl('', [Validators.required]),
    retire_date: new FormControl(''),
    position: new FormControl('', [Validators.required]),
    position_name: new FormControl(''),
    file: new FormControl(''),
    fileSource: new FormControl('')
  });
  user_data :any;
  Files = [];
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
    this.getFileList();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getFileList(){
    this.httpService.callHTTPGet('attach-file/academic/', this.personnel_id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.Files = event['body']['file_list'];
        }
      }
    );
  }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      });
    }
  }

  updateFile(update_data){
    this.attach_file_data = update_data;
    this.update_id = null;
    if (this.attach_file_data != null) {

      this.update_id = update_data.id;
      this.form = this.formBuilder.group({
                  'id' : update_data.id,
                  'hire_date' : update_data.hire_date,
                  'retire_date' : update_data.retire_date,
                  'position' : update_data.position,
                  'position_name' : update_data.position_name,
                  file: new FormControl(''),
                  fileSource: new FormControl('')
                });
    } else {
      this.form = this.formBuilder.group({
                  'id' : '',
                  hire_date: new FormControl('', [Validators.required]),
                  retire_date: new FormControl(''),
                  position: new FormControl('', [Validators.required]),
                  'position_name' : new FormControl(''),
                  file: new FormControl(''),
                  fileSource: new FormControl('')
                });
    }

    this.is_update = true;
  }

  cancelUpdateFile(){
    this.update_id = null;
    this.attach_file_data = null;
    this.is_update = false;
    this.error_message = null;
  }

  onSubmit(){

    this.error_message = null;
    this.submitted = true;

    if (this.form.invalid) {
      this.error_message = 'กรุณากรอกข้อมูลให้ครบตามที่กำหนด *';
      return;
    }

    const formData: FormData = new FormData();

    formData.append('id', this.form.value.id);
    formData.append('user_id', this.personnel_id);
    formData.append('file', this.form.get('fileSource').value);
    formData.append('hire_date', this.form.value.hire_date);
    formData.append('retire_date', this.form.value.retire_date);
    formData.append('position', this.form.value.position);
    formData.append('position_name', this.form.value.position_name);
    formData.append('action_by', this.user_data.email);

    console.log(this.form.value);
    this.uploadService.uploadFile('attach-file/academic', formData).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['id']);
          this.submitted = false;
          this.is_update = false;
          if(this.update_id == null){
            this.Files.push(event['body']['file_data']);
          }else{
            this.getFileList();
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

        this.httpService.callHTTPDelete('attach-file/academic/destroy/', data_id).subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.getFileList();
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
