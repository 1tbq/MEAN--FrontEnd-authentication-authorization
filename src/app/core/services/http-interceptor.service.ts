import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtService } from "./jwt.service";

@Injectable({
  providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    const token = this.jwtService.getToken();
    if (token) {
      headersConfig["Authorization"] = `bearer ${token}`;
    }
    const _req = req.clone({ setHeaders: headersConfig });
    return next.handle(_req);
  }
}
