import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {NzMessageService, NzNotificationService} from "ng-zorro-antd";
import {Router} from "@angular/router";

@Injectable()
export class MessagesInterceptor implements HttpInterceptor {

  constructor(private message: NzMessageService, private notification: NzNotificationService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      const error = err.error || err.statusText;
      switch (err.status) {
        case 403:
          this.message.error("Отказано в доступе");
          this.router.navigate(['/login_user']);
          break;
        case 400:
          this.notification.error('Внимание!', error);
          break;
      }

      return throwError(error);
    }));
  }
}
