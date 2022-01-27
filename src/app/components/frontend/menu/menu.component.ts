import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user_data : any;
  constructor(private tokenStorage: TokenStorageService) { 

  }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
    console.log(this.user_data.name);
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
