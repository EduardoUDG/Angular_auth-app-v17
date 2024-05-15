import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppsRoute } from '../router.routing';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  {
    path: AppsRoute.EMPTY,
    component: AuthLayoutComponent,
    children: [
      { path: AppsRoute.LOGIN,      component: LoginPageComponent },
      { path: AppsRoute.REGISTER,   component: RegisterPageComponent },
      { path: AppsRoute.ANY,        redirectTo: AppsRoute.LOGIN }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
