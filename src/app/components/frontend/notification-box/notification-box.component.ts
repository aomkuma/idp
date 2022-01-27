import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss']
})
export class NotificationBoxComponent implements OnInit {

  NotificationList : any = [];
  constructor() { }

  ngOnInit(): void {

    for(var i = 1; i <= 4; i++){
      this.NotificationList.push({'date' : new Date().toDateString(), 'desc' : 'แจ้งเตือน ' + i});
    }
  }

}
