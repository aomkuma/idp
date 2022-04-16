import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './components/frontend/dashboard/dashboard.component';
import { AdminDashboardComponent } from './components/backend/admin-dashboard/admin-dashboard.component';
import { AdminPersonnelListMnmComponent } from './components/backend/admin-personnel-list-mnm/admin-personnel-list-mnm.component';
import { AdminPersonnelUpdateMnmComponent } from './components/backend/admin-personnel-update-mnm/admin-personnel-update-mnm.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AdminEvaluateRoundMnmComponent } from './components/backend/admin-evaluate-round-mnm/admin-evaluate-round-mnm.component';
import { AdminDisciplineManageComponent } from './components/backend/admin-discipline-manage/admin-discipline-manage.component';
import { AdminDisciplineUpdateManageComponent } from './components/backend/admin-discipline-update-manage/admin-discipline-update-manage.component';
import { AdminDisciplineDetailManageComponent } from './components/backend/admin-discipline-detail-manage/admin-discipline-detail-manage.component';
import { AdminActivityManageComponent } from './components/backend/admin-activity-manage/admin-activity-manage.component';
import { AdminActivityUpdateManageComponent } from './components/backend/admin-activity-update-manage/admin-activity-update-manage.component';
import { AdminAdsManageComponent } from './components/backend/admin-ads-manage/admin-ads-manage.component';
import { AdminAdsUpdateManageComponent } from './components/backend/admin-ads-update-manage/admin-ads-update-manage.component';
import { HrDashboardComponent } from './components/backend/hr-dashboard/hr-dashboard.component';
import { AdminEvaluateFormComponent } from './components/backend/admin-evaluate-form/admin-evaluate-form.component';

import { PersonnelInfoComponent } from './components/frontend/personnel-info/personnel-info.component';
import { PersonnelFilesUpdateComponent } from './components/frontend/personnel-files-update/personnel-files-update.component';
import { PersonnelContactUpdateComponent } from './components/frontend/personnel-contact-update/personnel-contact-update.component';
import { EvaluateFormComponent } from './components/frontend/evaluate-form/evaluate-form.component';
import { SupervisorDashboardComponent } from './components/frontend/supervisor-dashboard/supervisor-dashboard.component';
import { IdpActivityComponent } from './components/frontend/idp-activity/idp-activity.component';
import { IdpActivityUpdateComponent } from './components/frontend/idp-activity-update/idp-activity-update.component';
import { SupervisorEvaluatePersonListComponent } from './components/frontend/supervisor-evaluate-person-list/supervisor-evaluate-person-list.component';
import { SupervisorEvaluateFormComponent } from './components/frontend/supervisor-evaluate-form/supervisor-evaluate-form.component';

const routes: Routes = [{ path: '', component: LoginComponent },
                    { path: 'login', component: LoginComponent },
                    { path: 'forgot-password', component: ForgotPasswordComponent },
                    { path: 'change-password', component: ChangePasswordComponent },
                    { path: 'dashboard', component: DashboardComponent },
                    { path: 'admin-dashboard', component: AdminDashboardComponent },
                    { path: 'admin-personnel-management', component: AdminPersonnelListMnmComponent },
                    { path: 'admin-personnel-management/update', component: AdminPersonnelUpdateMnmComponent },
                    { path: 'admin-personnel-management/update/:id', component: AdminPersonnelUpdateMnmComponent },
                    { path: 'admin-evaluate-round-management', component: AdminEvaluateRoundMnmComponent },
                    { path: 'admin-discipline-management', component: AdminDisciplineManageComponent },
                    { path: 'admin-discipline-management/update', component: AdminDisciplineUpdateManageComponent },
                    { path: 'admin-discipline-management/update/:id', component: AdminDisciplineUpdateManageComponent },
                    { path: 'admin-discipline-management/detail/:id', component: AdminDisciplineDetailManageComponent },
                    { path: 'admin-activity-management', component: AdminActivityManageComponent },
                    { path: 'admin-activity-management/update', component: AdminActivityUpdateManageComponent },
                    { path: 'admin-activity-management/update/:id', component: AdminActivityUpdateManageComponent },
                    { path: 'admin-ads-management', component: AdminAdsManageComponent },
                    { path: 'admin-ads-management/update', component: AdminAdsUpdateManageComponent },
                    { path: 'admin-ads-management/update/:id', component: AdminAdsUpdateManageComponent },
                    { path: 'hr-dashboard/:round_id/:status', component: HrDashboardComponent },
                    { path: 'admin-evaluate-form/:user_id', component: AdminEvaluateFormComponent },

                    { path: 'personnel-info', component: PersonnelInfoComponent },
                    { path: 'personnel-info/update-files', component: PersonnelFilesUpdateComponent },
                    { path: 'personnel-info/update-contact', component: PersonnelContactUpdateComponent },
                    { path: 'evaluate-form', component: EvaluateFormComponent },
                    { path: 'supervisor-dashboard', component: SupervisorDashboardComponent },
                    { path: 'idp-activities/:user_id', component: IdpActivityComponent },
                    { path: 'idp-activity/update/:idp_name', component: IdpActivityUpdateComponent },
                    { path: 'idp-activity/update/:activity_id/:idp_name', component: IdpActivityUpdateComponent },
                    { path: 'supervisor-evaluate-person-list/:status', component: SupervisorEvaluatePersonListComponent },
                    { path: 'supervisor-evaluate-form/:user_id', component: SupervisorEvaluateFormComponent },
                  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
