import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';
import { UploadServiceService } from '../../../services/upload-service.service';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-personnel-files-update',
  templateUrl: './personnel-files-update.component.html',
  styleUrls: ['./personnel-files-update.component.scss']
})
export class PersonnelFilesUpdateComponent implements OnInit {

  myForm = new FormGroup({
    file: new FormControl('')
  });
  id : any;
  personnel_files : any = [];
  user_data :any;
  submitted = false;
  error_message : any;
  closeModal : string;

  constructor(private modalService: NgbModal, 
              private formBuilder: FormBuilder, 
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

  getData(id){
      this.httpService.callHTTPGet('user/get/', id + '/Y').subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.id = event.body['Data']['id'];
          this.personnel_files = event.body['Files']['personnel_files'];
        }
        
      },
      err => {
      });
  }

  onFileChange(event:any) {
    for (var i = 0; i < event.target.files.length; i++) {
        console.log(event.target.files[i]); 
        this.personnel_files.push(event.target.files[i]);
    }
  }
  // addFiles() {
  //   this.personnel_files.push({'id' : '', 'user_id' : this.user_data.id, 'file_name' : '', 'file_path' : ''});
  // }

  onSubmit() {
    this.submitted = true;
    this.error_message = null;

    const formData: FormData = new FormData();

    formData.append('user_id', this.id);
    for (var i = 0; i < this.personnel_files.length; i++) { 
      formData.append("files[]", this.personnel_files[i]);
    }
    formData.append('action_by', this.user_data.email);
    
    this.uploadService.uploadFile('user/update/files', formData).subscribe(
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

  removePersonnelFile(index) {
    this.personnel_files.splice(index, 1);
  }

  triggerModal(content, data_id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(res);
      if(res == 'Confirm'){
        
        console.log(data_id);

        this.httpService.callHTTPDelete('user/destroy/file/', data_id).subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.getData(this.user_data.id);
            }
          }
        );
      }
      
    }, (res) => {
    });
  }
  

  goBack() {
    this.router.navigate(['/personnel-info']);
  }

}
