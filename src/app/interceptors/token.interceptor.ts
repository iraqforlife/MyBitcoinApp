import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  var service = inject(UserService);

  if (service.isLogged()) {
    req = req.clone({
      setHeaders: {
        Authorization: `${service.token}`,
      },
    });
  }

  return next(req);
};
