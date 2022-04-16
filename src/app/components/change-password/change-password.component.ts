import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../services/http-service.service';

import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('modalSuccessData')  modalSuccessData: ElementRef;
  form: FormGroup = new FormGroup({
    user_id: new FormControl(''),
    old_password: new FormControl('', [Validators.required/*, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,30}')*/]),
    // new_password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,30}')]),
    // confirm_password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,30}')]),
    new_password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{7,30}')]),
    confirm_password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{7,30}')]),
  });
  submitted = false;
  error_message = null;
  user_data :any;
  closeModal : string;
  modalData : any;
  show_old_password: boolean = false;
  show_new_password: boolean = false;
  show_confirm_password: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private modalService: NgbModal, 
              private activatedRoute: ActivatedRoute, 
              private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService
              ) { }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  isVisibilityOld() {
    if (this.show_old_password) {
      this.show_old_password = false;
    } else {
      this.show_old_password = true;
    }
  }

  isVisibilityNew() {
    if (this.show_new_password) {
      this.show_new_password = false;
    } else {
      this.show_new_password = true;
    }
  }

  isVisibilityConfirm() {
    if (this.show_confirm_password) {
      this.show_confirm_password = false;
    } else {
      this.show_confirm_password = true;
    }
  }

  onSubmit(){

    this.error_message = null;

    if (this.form.invalid) {
      this.error_message = 'รหัสผ่านใหม่ต้องมีขนาดอย่างน้อย 8 อักษร ประกอบไปด้วย A-Z,a-z,0-9';
      return;
    } else if(this.form.value.new_password != this.form.value.confirm_password) {
      this.error_message = 'รหัสผ่านใหม่กับยืนยันรหัสผ่านไม่ตรงกัน';
      return;
    } else if(this.form.value.new_password == this.form.value.old_password) {
      this.error_message = 'รหัสผ่านใหม่กับรหัส่านเดิมห้ามซ้ำกัน';
      return;
    }

    this.submitted = true;
    this.form.value.user_id = this.user_data.id;

    this.httpService.callHTTPPost('user/change-password', this.form.value).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.submitted = false;
          this.modalService.open(this.modalSuccessData, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
            this.closeModal = `Closed with: ${res}`;
            console.log(res);
            if(res == 'Confirm'){
              this.tokenStorage.signOut();
              window.location.replace('login');
              
            }
            
          }, (res) => {
            this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
          });
          // this.triggerModal('<div class="modal-header"><h4 class="modal-title" id="modal-basic-title">ผลการเปลี่ยนแปลงรหัสผ่าน</h4></div><div class="modal-body"><p>แก้ไขรหัสผ่านสำเร็จระบบจะทำการ Logout อัตโนมัติกรุณาเข้าสู่ระบบอีกครั้ง</p></div><div class="modal-footer"><button type="button" class="btn btn-danger" (click)="modal.close(\"Confirm\")">ออกจากระบบ</button></div>');
        }
      }, err => {
        this.error_message = err.error.message;
        this.submitted = false;
      }
    );
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.replace('login');
  }

  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(res);
      if(res == 'Confirm'){
        this.logout();
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
