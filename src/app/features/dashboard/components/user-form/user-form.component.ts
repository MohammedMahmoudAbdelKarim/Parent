import { Component, Inject, OnInit } from '@angular/core';
import { UserFormModel } from '../../models/user-form.model';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/core/services/http.service';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  private _subscription$: Subscription = new Subscription();
  userForm!: UserFormModel;

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    public dialogRef: MatDialogRef<UserFormComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data) {
      this.getUserById();
    }
  }

  initForm(): void {
    this.userForm = this._fb.group({
      name: this._fb.control(null, [Validators.required]),
      job: this._fb.control(null, [Validators.required]),
    });
  }

  getControl(controlName: string): AbstractControl {
    return this.userForm?.controls[controlName];
  }

  getUserById(): void {
    this._subscription$.add(
      this._httpService
        .GET(`users/${this.data?.id}`)
        .subscribe(({ data }: UserModel | any) => {
          this.userForm.patchValue({
            name: data.first_name + ' ' + data.last_name,
          });
        })
    );
  }

  onSubmit(): void {
    const request$ = this.data
      ? this._httpService.PUT(this.userForm.value, this.data?.id, 'users')
      : this._httpService.POST(this.userForm.value, 'users');
    this._subscription$.add(
      request$.subscribe({
        next: () => {
          const message = this.data ? 'Updated' : 'Created';
          this._toastr.success(
            `${message}!`,
            `User has been ${message.toLowerCase()} successfully`
          );
          this.dialogRef.close(true);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
