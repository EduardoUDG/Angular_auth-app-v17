import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppsRoute } from '../../../router.routing';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private _fb           = inject( FormBuilder );
  private _authService  = inject( AuthService );
  private _router       = inject( Router );

  public myForm: FormGroup = this._fb.group({
    email:      ['eduardo.dorado@sanmina.com', [Validators.required, Validators.email]],
    password:   ['123456', [Validators.required, Validators.minLength(6)]]
  });

  login():void {

    if ( this.myForm.invalid ) return;

    const { password, email } = this.myForm.value;

    this._authService.login( email, password ).subscribe({
      next: isSuccess => {
        this._router.navigateByUrl(`/${AppsRoute.DASHBOARD}`)
      },
      error: ( message  ) => {
        Swal.fire('Error', message, 'error')
      }
    });

  }

}
