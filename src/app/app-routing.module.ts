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

      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
