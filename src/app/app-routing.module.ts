import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './components/frontend/dashboard/dashboard.component';
import { AdminDashboardComponent } from './components/backend/admin-dashboard/admin-dashboard.component';
import { AdminPersonnelListMnmComponent } from './components/backend/admin-personnel-list-mnm/admin-personnel-list-mnm.component';
import { AdminPersonnelUpdateMnmComponent } from './components/backend/admin-personnel-update-mnm/admin-personnel-update-mnm.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
                    { path: 'dashboard', component: DashboardComponent },
                    { path: 'admin-dashboard', component: AdminDashboardComponent },
                    { path: 'admin-personnel-management', component: AdminPersonnelListMnmComponent },
                    { path: 'admin-personnel-management/update', component: AdminPersonnelUpdateMnmComponent },
                    { path: 'admin-personnel-management/update/:id', component: AdminPersonnelUpdateMnmComponent },

      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
