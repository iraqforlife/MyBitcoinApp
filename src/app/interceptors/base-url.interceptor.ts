import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.has('skip-baseurl-interceptor')) {
    var newhead = req.headers.delete('skip-baseurl-interceptor');
    const modifedReq = req.clone({ headers: newhead });
    return next(modifedReq);
  }
  const modifedReq = req.clone({ url: `${environment.baseUrl}${req.url}` });
  return next(modifedReq);
};
