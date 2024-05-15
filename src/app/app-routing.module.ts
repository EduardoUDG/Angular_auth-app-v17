import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppsRoute } from './router.routing';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: AppsRoute.AUTH,
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: AppsRoute.DASHBOARD,
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule )
  },
  {
    path: AppsRoute.ANY,
    redirectTo: AppsRoute.AUTH
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
