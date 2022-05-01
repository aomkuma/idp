import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date-bcd',
  templateUrl: './date-bcd.component.html',
  styleUrls: ['./date-bcd.component.scss']
})
export class DateBcdComponent implements OnInit {

  @Input() date: string = '';
  new_date : string;

  constructor() { }

  ngOnInit(): void {
    if (this.date) {
      var dt = this.date.split(' ');
      var d = dt[0].split('-');
      var year = d[0];
      var month = parseInt(d[1]);
      var month_txt = '';
      switch (month) {
        case 1: month_txt = 'มกราคม'; break;
        case 2: month_txt = 'กุมภาพันธ์'; break;
        case 3: month_txt = 'มีนาคม'; break;
        case 4: month_txt = 'เมษายน'; break;
        case 5: month_txt = 'พฤษภาคม'; break;
        case 6: month_txt = 'มิถุนายน'; break;
        case 7: month_txt = 'กรกฎาคม'; break;
        case 8: month_txt = 'สิงหาคม'; break;
        case 9: month_txt = 'กันยายน'; break;
        case 10: month_txt = 'ตุลาคม'; break;
        case 11: month_txt = 'พฤศจิกายน'; break;
        case 12: month_txt = 'ธันวาคม'; break;
      }
      var day = d[2];
      this.new_date = day + ' ' + month_txt + ' ' + (parseInt(year) + 543);
    }else {
      this.new_date = '';
    }
  }

}
