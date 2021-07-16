import { Injectable, Injector } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, finalize } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let tokenizedRequest = null;
    let locale= localStorage.getItem("locale")
    
    if(locale){
      locale = JSON.parse(locale)["accept-language"];
    }else{
      locale="*";

    }
    let token = localStorage.getItem("token");

    if (token != null) {
      tokenizedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": locale
        },
      
      });
      return next.handle(tokenizedRequest);
    }else{
     return next.handle(request);
    }

    
  }
}
