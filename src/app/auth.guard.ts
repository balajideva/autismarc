import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { Patientsno } from './entites/patientid';





@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
constructor(private loginservice:LoginService,private router:Router,private userservice:UserService){}
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean
{
  // console.log(route)
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
              if (route.data[0] === res.permission || route.data[1] === res.permission) {
                console.log('admin and therapist')
                return true
              } 

              
              
              else {
                console.log('pooooooooooooo')
                alert('access denied')
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





 