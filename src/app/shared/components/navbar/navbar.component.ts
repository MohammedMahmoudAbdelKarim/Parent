import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkModel } from 'src/app/core/models';
import { LINKs } from 'src/app/core/constants';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements AfterViewInit {
  constructor(private _router: Router, private _authService: AuthService) {
    this.checkAuthentication();
  }

  links: LinkModel[] = LINKs;
  token!: string | null;
  isAuthenticated!: boolean;

  ngAfterViewInit(): void {
    this.token = localStorage.getItem('token');
  }

  TrackedByTitle(index: number, item: LinkModel) {
    return item.title;
  }

  checkAuthentication(): void {
    this._authService.login$.subscribe((isLogin: boolean) => {
      this.isAuthenticated = isLogin;
    });
  }

  onLogout(): void {
    localStorage.removeItem('token');
    this._router.navigateByUrl('/auth/login');
    this._authService.isLogout();
  }
}
