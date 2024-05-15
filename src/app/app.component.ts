import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';
import { AppsRoute } from './router.routing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private _authService = inject( AuthService );
  private router       = inject( Router );

  public finishedAuthCheck = computed<boolean>( () => {
    if ( this._authService.authStatus() === AuthStatus.checking ) {
      return false;
    }

    return true;
  });

  public authStatusChangedEffect = effect( () => {

    switch( this._authService.authStatus() ) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl(`/${AppsRoute.DASHBOARD}`);
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl(`/${AppsRoute.AUTH}/${AppsRoute.LOGIN}`);
        return;
    }
    
  });


}
