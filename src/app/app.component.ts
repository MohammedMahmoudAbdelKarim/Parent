import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    public loadingService: LoadingService,
    private _cdr: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    this._cdr.detectChanges();
  }
}
