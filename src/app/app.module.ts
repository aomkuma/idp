import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BaseUrlInterceptorInterceptor } from './interceptor/base-url-interceptor.interceptor';

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
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AdminEvaluateRoundMnmComponent } from './components/backend/admin-evaluate-round-mnm/admin-evaluate-round-mnm.component';
import { DateBcdDirective } from './directives/date-bcd.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AdminDisciplineManageComponent } from './components/backend/admin-discipline-manage/admin-discipline-manage.component';
import { AdminDisciplineUpdateManageComponent } from './components/backend/admin-discipline-update-manage/admin-discipline-update-manage.component';
import { AdminDisciplineDetailManageComponent } from './components/backend/admin-discipline-detail-manage/admin-discipline-detail-manage.component';
import { AdminActivityManageComponent } from './components/backend/admin-activity-manage/admin-activity-manage.component';
import { AdminActivityUpdateManageComponent } from './components/backend/admin-activity-update-manage/admin-activity-update-manage.component';
import { PersonnelInfoComponent } from './components/frontend/personnel-info/personnel-info.component';
import { PersonnelFilesUpdateComponent } from './components/frontend/personnel-files-update/personnel-files-update.component';
import { PersonnelContactUpdateComponent } from './components/frontend/personnel-contact-update/personnel-contact-update.component';
import { AdminAdsManageComponent } from './components/backend/admin-ads-manage/admin-ads-manage.component';
import { AdminAdsUpdateManageComponent } from './components/backend/admin-ads-update-manage/admin-ads-update-manage.component';
import { EvaluateFormComponent } from './components/frontend/evaluate-form/evaluate-form.component';

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
    ConfirmDialogComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    AdminEvaluateRoundMnmComponent,
    DateBcdDirective,
    SpinnerComponent,
    AdminDisciplineManageComponent,
    AdminDisciplineUpdateManageComponent,
    AdminDisciplineDetailManageComponent,
    AdminActivityManageComponent,
    AdminActivityUpdateManageComponent,
    PersonnelInfoComponent,
    PersonnelFilesUpdateComponent,
    PersonnelContactUpdateComponent,
    AdminAdsManageComponent,
    AdminAdsUpdateManageComponent,
    EvaluateFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [authInterceptorProviders,{provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
