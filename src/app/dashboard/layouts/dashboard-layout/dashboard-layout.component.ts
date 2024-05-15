import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { AppsRoute } from '../../../router.routing';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  private _authService = inject( AuthService );
  
  public authLoginRoute = `/${AppsRoute.AUTH}/${AppsRoute.LOGIN}`;

  public user = computed( ()=> this._authService.currentUser() );

  onLogout():void {
    this._authService.logout();
  }

}
