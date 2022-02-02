import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-admin-personnel-list-mnm',
  templateUrl: './admin-personnel-list-mnm.component.html',
  styleUrls: ['./admin-personnel-list-mnm.component.scss']
})
export class AdminPersonnelListMnmComponent implements OnInit {

  list : any = [];
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    position: new FormControl(''),
  });
  submitted = false;
  page = 1;
  total_data = 0;
  closeModal : string;
  
  constructor(private modalService: NgbModal, private httpService: HttpServiceService) { }

  ngOnInit(): void {
    this.loadList();
  }

  loadList(){

    this.submitted = true;
    this.httpService.callHTTPGet('users', '/N').subscribe(
    event => {
      if (event instanceof HttpResponse) {
        console.log(event['body']);
        this.list = event['body']['data'];
        this.page = event['body']['current_page'];
        this.total_data = event['body']['total'];
        this.submitted = false;
      }
      
    },
    err => {
      this.submitted = false;
    });
  }

  onSubmit(){
    this.submitted = true;

    var condition = '/N';
    if (this.form.value.name != '') {
      condition += '/' + this.form.value.name;
    } else {
      condition += '/';
    }
    if (this.form.value.position != '') {
      condition += '/' + this.form.value.position;
    } else {
      condition += '/';
    }

    this.httpService.callHTTPGet('users', condition).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.list = event['body']['data'];
          this.page = event['body']['current_page'];
          this.total_data = event['body']['total'];
          this.submitted = false;
        }
        
      },
      err => {
        this.submitted = false;
      });
  }

  triggerModal(content, data_id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(res);
      if(res == 'Confirm'){
        
        console.log(data_id);

        this.httpService.callHTTPDelete('users/destroy/', data_id).subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.onSubmit();
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
