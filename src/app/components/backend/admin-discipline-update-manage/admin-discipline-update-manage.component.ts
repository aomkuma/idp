import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';

import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-admin-discipline-update-manage',
  templateUrl: './admin-discipline-update-manage.component.html',
  styleUrls: ['./admin-discipline-update-manage.component.scss']
})

export class AdminDisciplineUpdateManageComponent implements OnInit {
  
  list : any = null;
  work_unit_list : any = [];
  form: FormGroup = new FormGroup({
    personnel_work_unit: new FormControl('', Validators.required),
    discipline_date: new FormControl('', Validators.required),
  });
  user_data :any;
  submitted = false;
  submitted_update = false;
  error_message = null;
  closeModal : string;
  @ViewChild('modalSuccessData')  modalSuccessData: ElementRef;

  constructor(private modalService: NgbModal,
              private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
    this.work_unit_list.push({'value' : 'คอมพิวเตอร์ธุรกิจ', 'name' : 'คอมพิวเตอร์ธุรกิจ'},
                              {'value' : 'การตลาด', 'name' : 'การตลาด'},
                              {'value' : 'การจัดการทรัพยากรมนุษย์', 'name' : 'การจัดการทรัพยากรมนุษย์'},
                              {'value' : 'การจัดการทั่วไป', 'name' : 'การจัดการทั่วไป'},
                              {'value' : 'การเงิน', 'name' : 'การเงิน'},
                              {'value' : 'การบริหารธุรกิจระหว่างประเทศ', 'name' : 'การบริหารธุรกิจระหว่างประเทศ'},
                              {'value' : 'การจัดการโลจิสติกส์และซัพพลายเชน', 'name' : 'การจัดการโลจิสติกส์และซัพพลายเชน'},
                              {'value' : 'การบัญชี', 'name' : 'การบัญชี'},
                              {'value' : 'เศรษฐศาสตร์ธุรกิจ', 'name' : 'เศรษฐศาสตร์ธุรกิจ'},
                              {'value' : 'เศรษฐศาสตร์ระหว่างประเทศ', 'name' : 'เศรษฐศาสตร์ระหว่างประเทศ'},
                            );
    this.form.get('discipline_date').setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(){
    this.submitted = true;
    this.httpService.callHTTPGet('discipline/search/', this.form.value.personnel_work_unit).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']['data']);
          this.list = event['body']['data'];

          for (var i = 0; i < this.list.length; i++) {
            this.list[i].discipline_status = 'ปกติ';
            this.list[i].remark = null;
          }

          this.submitted = false;
        }
        
      },
      err => {
        this.submitted = false;
      });
  }

  save() {
    this.submitted_update = true;
    this.error_message = null;
    if (this.form.invalid) {
      this.error_message = 'กรุณาตรวจสอบความรคบถ้วนและถูกต้องของข้อมูล';
      return;
    }

    // return;
    this.httpService.callHTTPPost('discipline/update', {'discipline' : this.form.value, 'personnel_list' : this.list, 'action_by' : this.user_data.email}).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.modalService.open(this.modalSuccessData, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
            this.closeModal = `Closed with: ${res}`;
            console.log(res);
            if(res == 'Confirm'){
              window.location.reload();
            }
            
          }, (res) => {
            this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
            this.submitted_update = false;
          });
        }
      },
      err => {
        this.error_message = err.error.message;
        this.submitted_update = false;
      }
    );
  }

  triggerModal(content, data_id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(res);
      if(res == 'Confirm'){
        
        console.log(data_id);

        this.httpService.callHTTPDelete('evaluate-round/destroy/', data_id).subscribe(
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
