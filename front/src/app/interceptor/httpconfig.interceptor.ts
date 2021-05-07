import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent   
} from '@angular/common/http';

import { Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {        
    constructor(public authService: AuthService,private router: Router) { }   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
             tap(
                event => {
                },
                error => {
                    return this.onError(error,request,next);
                }
            ));
    }
  

    onError(error, request?, next?) {
        
        const errorResponse = error.error;
        if (errorResponse) {
            switch (error.status) {
                case 400:
                 
                    if(error.error.data.message == 'Request failed with status code 401')
                    {
                        if(localStorage.getItem('refreshToken'))
                        {   
                            const data = {
                                refreshToken : localStorage.getItem('refreshToken')
                            } 
                            this.authService.generateNewToken(data).subscribe(
                                (response: any) => {
                                    if(response.data.access_token)
                                    {
                                        localStorage.setItem('driveAccessToken',response.data.access_token);
                                        if(this.router.url.indexOf('/dashboard/registru') > -1)
                                        {
                                            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                                            this.router.navigate(['/dashboard']));
                                        }
                                        else
                                        {
                                            this.router.navigate(['/dashboard']);
                                        }
                                    }
                                    else{
                                        this.router.navigate(['/']);
                                    }
                                },
                                err => {
                                    console.log("getting error while generating code");
                                }
                                )
                        }
                        else{
                            this.router.navigate(['/']);
                        }
                        break;
                }
                default:
                    break;
            }
        }
    }
}