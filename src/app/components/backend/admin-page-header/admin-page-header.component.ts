import { Component, OnInit, Input } from '@angular/core';

import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-admin-page-header',
  templateUrl: './admin-page-header.component.html',
  styleUrls: ['./admin-page-header.component.scss']
})
export class AdminPageHeaderComponent implements OnInit {

  @Input() name: string = '';
  user_data: any;
  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
    
  }

}
