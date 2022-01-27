import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';

import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-admin-personnel-list-mnm',
  templateUrl: './admin-personnel-list-mnm.component.html',
  styleUrls: ['./admin-personnel-list-mnm.component.scss']
})
export class AdminPersonnelListMnmComponent implements OnInit {

  list : any = [];
  constructor(private httpService: HttpServiceService) { }

  ngOnInit(): void {
    this.loadList();
    // for(var i = 0; i < 3; i++){
    //   this.list.push({'id' : null, 
    //                     'name' : 'name ' + i,
    //                     'line_work' : 'สายงาน ' + i,
    //                     'position' : 'position',
    //                     'position_academic' : 'ตำแหน่งทางวิชาการ',
    //                     'employer' : 'ต้นสังกัด',
    //                     'position_management' : 'ตำแหน่งบริหาร',
    //                   }
    //                 );
    }

  loadList(){
      this.httpService.callHTTPGet('users', 'N').subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event['body']);
          this.list = event['body'];
        }
        
      },
      err => {
      });
  }
  

}
