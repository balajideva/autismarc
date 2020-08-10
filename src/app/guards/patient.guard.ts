import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {

  constructor(private httpClient:HttpClient,private loginservice:LoginService,private userservice:UserService,
    private router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.loginservice.LoggedIn()){
  
  
        this.userservice.getUser().toPromise().then((res:any) => {
          console.log(res)
          if (res.username === undefined) {
           
            this.loginservice.logout();
            this.router.navigate(['/Login']);
            return false
            
         
       } else {
           
            this.loginservice.getpermission().then((res:any)=> {
              // console.log(res)
              // console.log(route.data[0])
                if (route.data[0] === res.permission) {
                  console.log('patient ')
                  return true
                } 
  
                
                
                else {
                  console.log('pooooooooooooo')
                  alert('acess denied')
                  this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
                  return false
                }
            },
            error => {
              alert(error)
              console.error('Error!', error) }
            );
       }
         
        
        },
         error => { console.error('Error!', error) }
         )
  
       return true
      }
  
    else{
      alert('please log in')
      this.router.navigate(['/Login']);
  
      return false 
    }
  }
  
}
