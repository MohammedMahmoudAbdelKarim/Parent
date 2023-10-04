import { Subscription } from 'rxjs';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserFormComponent } from '../user-form/user-form.component';
import { HttpService } from 'src/app/core/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
})
export class OffcanvasComponent {
  constructor(private _httpService: HttpService, public dialog: MatDialog) {}
  @Input() user!: UserModel;
  private _subscription$: Subscription = new Subscription();
  @Output() closeOffcanvasEmitter = new EventEmitter();
  @Output() deleteUserEmitter = new EventEmitter();

  closeDrawer(): void {
    this.closeOffcanvasEmitter.emit(true);
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

  openDeletePopup(data: UserModel): void {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, { data });
    this._subscription$.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.deleteUserEmitter.emit({ result, data });
          this.closeDrawer();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
