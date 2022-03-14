import { Component, OnInit, Input } from '@angular/core';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  user_data : any;
  @Input() menu: string = '';

  constructor(private tokenStorage: TokenStorageService) { 

  }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
    // $('#sidebarCollapse').on('click', function () {
    //     $('#sidebar').toggleClass('active');
    // });
    console.log(this.user_data.name);
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
