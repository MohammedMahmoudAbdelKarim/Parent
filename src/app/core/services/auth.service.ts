import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private isLoginSubject$ = new BehaviorSubject(false);
  login$ = this.isLoginSubject$.asObservable();

  public isLogin() {
    this.isLoginSubject$.next(true);
  }
  public isLogout() {
    this.isLoginSubject$.next(false);
  }
}
