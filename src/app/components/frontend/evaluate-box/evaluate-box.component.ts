import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { HttpServiceService } from '../../../services/http-service.service';

import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-evaluate-box',
  templateUrl: './evaluate-box.component.html',
  styleUrls: ['./evaluate-box.component.scss']
})
export class EvaluateBoxComponent implements OnInit {

  EvaluateList : any = {'data' : []};
  user_data : any;
  evaluate_round : any;

  constructor(private formBuilder: FormBuilder, 
              private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    /*for(var i = 1; i <= 3; i++){
      this.EvaluateList.push({'desc' : 'แจ้งเตือน ', 'status' : false});
    }*/

    // this.EvaluateList[0].status = true;
    this.user_data = this.tokenStorage.getUser().user;
    this.getData();
  }

  getData(){
      this.httpService.callHTTPGet('idp/by-user/', this.user_data.id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.evaluate_round = event.body['evaluate_round'];
          this.EvaluateList = event.body['master_idp_list'];
        }
        
      },
      err => {
      });
  }
}
