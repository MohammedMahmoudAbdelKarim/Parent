import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { UserModel } from '../models/user.model';
import { UserFormComponent } from './user-form/user-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'de-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private _subscription$: Subscription = new Subscription();

  constructor(
    private _httpService: HttpService,
    public dialog: MatDialog,
    private _toastr: ToastrService,
    private _cdr: ChangeDetectorRef
  ) {}

  usersList!: UserModel[];
  limit: number = 10;
  singleUser!: UserModel;
  index!: number;

  ngOnInit(): void {
    this.list();
  }

  ngAfterViewInit(): void {
    this._cdr.detectChanges();
  }

  list(): void {
    this._subscription$.add(
      this._httpService
        .GET(`users?page=1&per_page=${this.limit}`)
        .subscribe(({ data }: UserModel[] | any) => {
          this.usersList = data;
        })
    );
  }
  TrackedById(index: number, item: UserModel) {
    return item.id;
  }

  onScroll(): void {
    this.limit += 5;
    this.list();
  }

  openUserForm(data?: UserModel): void {
    const dialogRef = this.dialog.open(UserFormComponent, { data });
    this._subscription$.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          dialogRef.close(true);
        }
      })
    );
  }

  openDeletePopup(i: number, data?: UserModel): void {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, { data });
    this._subscription$.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.deleteUser(i, data);
          this.index = i;
        }
      })
    );
  }

  onDeleteUserFromDrawer(event: { result: boolean; data: UserModel }): void {
    if (event.result) {
      this.deleteUser(this.index, event.data);
    }
  }

  deleteUser(i: number, user?: UserModel): void {
    this._subscription$.add(
      this._httpService.DELETE(user?.id, 'users').subscribe((res) => {
        this._toastr.success(
          `${user?.first_name + ' ' + user?.last_name} has been deleted`,
          'Deleted'
        );
        this.usersList.splice(i, 1);
        // this.list() // To get the updated users list;
      })
    );
  }
  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
