import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  

import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  submitted = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, 
              private tokenStorage: TokenStorageService,
              private router : Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.reloadPage();
    }
  }

  onSubmit(): void {

    this.errorMessage = '';

    const { email, password } = this.form;

    this.submitted = true;
    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveUser(data);

        this.submitted = false;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        console.log(err.error.error);
        this.errorMessage = err.error.error;
        this.isLoginFailed = true;
        this.submitted = false;
      }
    );
  }

  reloadPage(): void {
    // window.location.reload();
    this.router.navigate(['/dashboard']);
  }
}