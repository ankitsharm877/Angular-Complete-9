import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import  { tap } from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log("http request on its way.");
        const modifiedreq = req.clone({
            headers: req.headers.append('auth','xyz')
        });
        return next.handle(modifiedreq)
      /*   .pipe(tap(event => {
            if (event.type === HttpEventType.Response) {
                console.log("Response arrived, body data :");
                console.log(event.body);
            }
        })) */;
    }

}