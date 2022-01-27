import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluate-box',
  templateUrl: './evaluate-box.component.html',
  styleUrls: ['./evaluate-box.component.scss']
})
export class EvaluateBoxComponent implements OnInit {

  EvaluateList : any = [];
  constructor() { }

  ngOnInit(): void {
    for(var i = 1; i <= 3; i++){
      this.EvaluateList.push({'desc' : 'แจ้งเตือน ', 'status' : false});
    }

    this.EvaluateList[0].status = true;
  }

}
