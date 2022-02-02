import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../services/http-service.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required/*, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,30}')*/]),
  });
  submitted = false;
  error_message = null;

  constructor(private formBuilder: FormBuilder,
              private modalService: NgbModal, 
              private activatedRoute: ActivatedRoute, 
              private httpService: HttpServiceService,
              ) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(){

    this.error_message = null;

    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    
    this.httpService.callHTTPPost('user/forgot-password', this.form.value).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.submitted = false;
          window.location.replace('login');
          // this.triggerModal('<div class="modal-header"><h4 class="modal-title" id="modal-basic-title">ผลการเปลี่ยนแปลงรหัสผ่าน</h4></div><div class="modal-body"><p>แก้ไขรหัสผ่านสำเร็จระบบจะทำการ Logout อัตโนมัติกรุณาเข้าสู่ระบบอีกครั้ง</p></div><div class="modal-footer"><button type="button" class="btn btn-danger" (click)="modal.close(\"Confirm\")">ออกจากระบบ</button></div>');
        }
      }, err => {
        this.error_message = err.error.message;
        this.submitted = false;
      }
    );
  }

}
