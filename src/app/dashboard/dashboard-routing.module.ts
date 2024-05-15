import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppsRoute } from '../router.routing';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: AppsRoute.EMPTY,
    component: DashboardLayoutComponent,
    // children: [
    //   { path: AppsRoute.LOGIN,      component: LoginPageComponent },
    //   { path: AppsRoute.REGISTER,   component: RegisterPageComponent },
    //   { path: AppsRoute.ANY,        redirectTo: AppsRoute.LOGIN }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
