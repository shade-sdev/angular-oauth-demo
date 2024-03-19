import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, switchMap, tap} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  headerName: string = 'X-XSRF-TOKEN';
  csrfToken: string | undefined;

  constructor(private tokenExtractor: HttpXsrfTokenExtractor,
              private http: HttpClient) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.csrfToken = this.tokenExtractor.getToken() as string;

    if (this.csrfToken == null && request.method == 'POST') {
      return this.retrieveCsrfToken().pipe(
        tap(response => {
          this.csrfToken = response?.token;
        }),
        switchMap(_ => next.handle(request.clone({
          headers: request.headers.set(this.headerName, this.csrfToken ?? ''),
          withCredentials: true
        })))
      );
    } else if (this.csrfToken != null && request.method == 'POST') {
      request = request.clone({
        headers: request.headers.set(this.headerName, this.csrfToken), withCredentials: true
      });
    } else {
      request = request.clone({
        withCredentials: true
      });
    }

    return next.handle(request);
  }

  retrieveCsrfToken(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/csrf');
  }

}
