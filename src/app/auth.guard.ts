import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (sessionStorage.getItem('hemolife_auth') === 'true') return true;
  router.navigate(['/login']);
  return false;
};