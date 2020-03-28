import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryNumbersService } from '../../Services/CountryNumbersService';
import { finalize } from 'rxjs/operators';

@Injectable()
export class i1Interceptor implements HttpInterceptor {

    constructor(private service : CountryNumbersService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler)  {
     this.service.showLoader();
       
     return next.handle(req).pipe(finalize(() => {
            this.service.hideLoader();
        }));
    }
}
