import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginFormModel } from '../../models/auth-form.model';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'de-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription();
  loginForm!: LoginFormModel;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _httpService: HttpService,
    private _toastr: ToastrService,
    private _authService: AuthService
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.loginForm = this._fb.group({
      username: this._fb.control('eve.holt@reqres.in', [Validators.required]),
      password: this._fb.control('cityslicka', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
  public getControl(controlName: string): AbstractControl {
    return this.loginForm?.controls[controlName];
  }
  public onSubmit(): void {
    this.subscription$.add(
      this._httpService
        .POST(this.loginForm.value, 'login')
        .subscribe((res: { token: string } | any) => {
          localStorage.setItem('token', res.token);
          this._authService.isLogin();
          this._toastr.success('Welcome back!', 'Success');
          this._router.navigateByUrl('/dashboard');
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
