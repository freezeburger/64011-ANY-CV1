import { HttpInterceptorFn } from '@angular/common/http';

const API_HOST = 'http://localhost:5050';

export const defaultInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.includes('/api')) {
    const clone = req.clone({
      headers: req.headers.set('X-New-Header', 'new header value'),
      url: req.url.replace('/api', API_HOST)
    });
    return next(clone);
  }

  return next(req);
};
