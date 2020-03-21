import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

// @Injectable()
// export class i1Interceptor implements HttpInterceptor {

//     intercept(req: HttpRequest<any>, next: HttpHandler)  {
    
//         const modified = req.clone({setHeaders : {'custom-header-1' : 'Pushpak'}});

//         return next.handle(modified);
//     }
// }

// @Injectable()
// export class i2Interceptor implements HttpInterceptor {

//     intercept(req: HttpRequest<any>, next: HttpHandler)  {
    
//         const modified = req.clone({setHeaders : {'custom-header-2' : 'Panchal'}});

//         return next.handle(modified);
//     }
// }