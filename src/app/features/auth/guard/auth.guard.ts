import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  }
  toastr.warning('You need to login first', 'Access denied');
  router.navigateByUrl('/auth/login');
  return false;
};
