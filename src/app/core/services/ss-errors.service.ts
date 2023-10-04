import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class SSErrorService {
  constructor() {}

  private _serverErrorsSubject$ = new BehaviorSubject(null);
  serverErrors$ = this._serverErrorsSubject$.asObservable();

  // Server Error Handle Configuration
  public addServerErrors(errors: any) {
    this._serverErrorsSubject$.next(errors);
  }
  public removeServerErrors() {
    this._serverErrorsSubject$.next(null);
  }
}
