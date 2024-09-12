import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalStorageService } from "src/services/localstorage/localstorage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private localStorageService: LocalStorageService
    ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localStorageService.getLocaleState('authToken');
        if(token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        return next.handle(req);
    }
}