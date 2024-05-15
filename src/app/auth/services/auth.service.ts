import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL: string = environment.baseUrl;
  private readonly TOKEN_KEY: string = '_app-name-token';

  private _http = inject( HttpClient );  
  private _currentUser = signal<User|null>(null);
  private _authStatus  = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus  = computed( () => this._authStatus() );

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  login( email: string, password:string ):Observable<boolean> {
    const url: string = `${this.BASE_URL}/auth/login`;
    const body = { email, password };

    return this._http.post<LoginResponse>( url, body )
                  .pipe(
                    map( ({ user, token }) => this.setAuthentication(user, token) ),
                    catchError( err => throwError( ()=> err.error.message) )
                  );
  }

  checkAuthStatus():Observable<boolean> {
    const url: string = `${this.BASE_URL}/auth/check-token`;
    const token = this.getToken();

    if ( !token ) {
      this.logout();
      return of( false );
    }

    const headers = new HttpHeaders();
    headers.set('Authorization', `Bearer ${ token }`);

    return this._http.get<CheckTokenResponse>(url, { headers })
                  .pipe(
                    map( ({token, user}) => this.setAuthentication( user, token) ),
                    catchError( () => {
                      this._authStatus.set(AuthStatus.notAuthenticated);
                      return of(false)
                    })
                  );
  }

  private setAuthentication( user: User, token: string ):boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    this.setToken( token );
    return true;
  }

  logout():void {
    localStorage.clear();
    this._currentUser.set( null );
    this._authStatus.set( AuthStatus.notAuthenticated );
  }
  
  setToken( token:string ):void {
    localStorage.setItem( this.TOKEN_KEY, token );
  }

  getToken():string {
    const token = localStorage.getItem( this.TOKEN_KEY ) ?? '';
    return token;
  }
  
}
