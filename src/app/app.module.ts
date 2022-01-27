import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { DashboardComponent } from './components/frontend/dashboard/dashboard.component';
import { MenuComponent } from './components/frontend/menu/menu.component';
import { NotificationBoxComponent } from './components/frontend/notification-box/notification-box.component';
import { EvaluateBoxComponent } from './components/frontend/evaluate-box/evaluate-box.component';
import { AdminDashboardComponent } from './components/backend/admin-dashboard/admin-dashboard.component';
import { AdminMenuComponent } from './components/backend/admin-menu/admin-menu.component';
import { AdminPageHeaderComponent } from './components/backend/admin-page-header/admin-page-header.component';
import { AdminPersonnelListMnmComponent } from './components/backend/admin-personnel-list-mnm/admin-personnel-list-mnm.component';
import { AdminPersonnelUpdateMnmComponent } from './components/backend/admin-personnel-update-mnm/admin-personnel-update-mnm.component';
import { AdminEducationFileManageComponent } from './components/backend/admin-education-file-manage/admin-education-file-manage.component';
import { AdminWorkInfoFileManageComponent } from './components/backend/admin-work-info-file-manage/admin-work-info-file-manage.component';
import { AdminAcademicFileManageComponent } from './components/backend/admin-academic-file-manage/admin-academic-file-manage.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    NotificationBoxComponent,
    EvaluateBoxComponent,
    AdminDashboardComponent,
    AdminMenuComponent,
    AdminPageHeaderComponent,
    AdminPersonnelListMnmComponent,
    AdminPersonnelUpdateMnmComponent,
    AdminEducationFileManageComponent,
    AdminWorkInfoFileManageComponent,
    AdminAcademicFileManageComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
