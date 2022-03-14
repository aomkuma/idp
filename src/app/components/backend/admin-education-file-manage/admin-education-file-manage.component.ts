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
  selector: 'app-admin-education-file-manage',
  templateUrl: './admin-education-file-manage.component.html',
  styleUrls: ['./admin-education-file-manage.component.scss']
})
export class AdminEducationFileManageComponent implements OnInit {

  @Input() personnel_id: string = '';
  attach_file_data: any;
  storage_url : any = environment.fileUrl;

  form: FormGroup = new FormGroup({
    id:  new FormControl(''),
    qualification: new FormControl('', [Validators.required]),
    graduated: new FormControl('', [Validators.required]),
    graduated_year: new FormControl('', [Validators.required]),
    academy: new FormControl('', [Validators.required]),
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
    this.httpService.callHTTPGet('attach-file/education/', this.personnel_id).subscribe(
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
                  'qualification' : update_data.qualification,
                  'graduated' : update_data.graduated,
                  'graduated_year' : update_data.graduated_year,
                  'academy' : update_data.academy,
                  file: new FormControl(''),
                  fileSource: new FormControl('')
                });
    } else {
      this.form = this.formBuilder.group({
                  'id' : '',
                  qualification: new FormControl('', [Validators.required]),
                  graduated: new FormControl('', [Validators.required]),
                  graduated_year: new FormControl('', [Validators.required]),
                  academy: new FormControl('', [Validators.required]),
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
    formData.append('qualification', this.form.value.qualification);
    formData.append('graduated', this.form.value.graduated);
    formData.append('graduated_year', this.form.value.graduated_year);
    formData.append('academy', this.form.value.academy);
    formData.append('action_by', this.user_data.email);

    console.log(this.form.value);
    this.uploadService.uploadFile('attach-file/education', formData).subscribe(
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

        this.httpService.callHTTPDelete('attach-file/education/destroy/', data_id).subscribe(
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
