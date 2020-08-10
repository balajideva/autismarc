import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector,public loginservice:LoginService) { }

  intercept(req, next){
    let loginservice = this.injector.get(LoginService)
    let tokenizedReq=req.clone({
      setHeaders:{
        Authorization : `jwt ${loginservice.gettoken()}`
      }
    })
    
    return next.handle(tokenizedReq)
  }
}
