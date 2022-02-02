import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user_data : any;
  closeModal: string;

  constructor(private modalService: NgbModal, private tokenStorage: TokenStorageService) { 

  }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
    console.log(this.user_data.name);
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.replace('login');
  }

  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(res);
      if(res == 'Confirm'){
        this.logout();
      }
      
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
