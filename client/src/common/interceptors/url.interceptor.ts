import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        const url = req.url;
        const clonedReq = req.clone({ url: 'http://localhost:8000/api' + url });
        return next.handle(clonedReq);
    }
}