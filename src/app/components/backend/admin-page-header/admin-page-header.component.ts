import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-page-header',
  templateUrl: './admin-page-header.component.html',
  styleUrls: ['./admin-page-header.component.scss']
})
export class AdminPageHeaderComponent implements OnInit {

  @Input() name: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
