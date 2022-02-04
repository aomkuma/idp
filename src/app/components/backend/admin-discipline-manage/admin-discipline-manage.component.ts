import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';

import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-admin-discipline-manage',
  templateUrl: './admin-discipline-manage.component.html',
  styleUrls: ['./admin-discipline-manage.component.scss']
})
export class AdminDisciplineManageComponent implements OnInit {

  list : any = null;
  work_unit_list : any = [];
  form: FormGroup = new FormGroup({
    personnel_name: new FormControl(''),
    discipline_status: new FormControl(''),
    personnel_work_unit: new FormControl(''),
    discipline_date_from: new FormControl(''),
    discipline_date_to: new FormControl(''),
  });
  user_data :any;
  submitted = false;
  error_message = null;
  page = 1;
  total_data = 0;
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
    this.form.get('discipline_date_from').setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.form.get('discipline_date_to').setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.onSubmit();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  onSubmit(){
    this.submitted = true;
    this.httpService.callHTTPPost('discipline', this.form.value).subscribe(
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

}
