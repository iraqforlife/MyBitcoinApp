import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { Roles } from '../enum/roles';

export const RoleGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const role = route.data['role'] as Roles;
  if (!userService.isLogged()) {
    return false;
  }

  if (!userService.validateRole(role)) {
    return false;
  }
  return true;
};
