import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token-interceptor';


export const CORE_HTTP_INTERCEPTORS = [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }];
