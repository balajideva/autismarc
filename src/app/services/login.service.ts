import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Patientsno } from '../entites/patientid';
import * as jwt_decode from "jwt-decode"
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user:any;

  constructor( private httpClient:HttpClient,private router:Router) { 
    
  }


  private loggedIn=false;
  private signin="http://localhost:3000/api/authenticate"
  
  login(user){
    return this.httpClient.post(this.signin,user,{withCredentials: true}).toPromise().then(res => {
     this.loggedIn=(res as any).success == true;
      return res;
     });



   }
  
   logout(): void{
    this.loggedIn = false;
    // localStorage.clear();
    localStorage.removeItem('token')
   }
  


private permission = "http://localhost:3000/api/permission"

getpermission(){
  return this.httpClient.get(this.permission ).toPromise().then(res=>res as Patientsno[]);
}



    storeUserData( token) {
      console.log(token)
    
      if(token){
        localStorage.setItem('token', token);
      
      }
      else{
        localStorage.removeItem('token')
      }
    
     
      // this.user = user;
    }
  

gettoken(){
 return localStorage.getItem('token')

}


    LoggedIn(){
      return !!localStorage.getItem('token')
  
    }


    // LoggedIn():boolean{
    //   const token1 = localStorage.getItem('token');
    // const decoded1 = jwt_decode(token1);
    //   if (this.gettoken()) {
    //     if(decoded1.exp === undefined){
    //       return false
    //     }
    //     const date = new Date(0)
    //     let tokenexpdate = date.setUTCSeconds(decoded1.exp)
    //     if(tokenexpdate.valueOf() > new Date().valueOf()){
       
    //       // console.log(new Date().valueOf())
    //       // console.log(tokenexpdate)
    //       return true; // Return true if in storage
    //     }
    //   // console.log(new Date().valueOf())
    //   // console.log(tokenexpdate)
    
    // return false
    
    // } else {
    //     return false; // Return false if not in storage
    // }
    
    // }


    private facebook="http://localhost:3000/auth/facebook"
    social(){
      return this.httpClient.get(this.facebook);
    }


userviatoken(){
  const token = localStorage.getItem('token')
  if(token ===null || token==="" ){
    this.logout();
    this.router.navigate(['login'])
  }
  else {

  const decoded = jwt_decode(token);

return decoded.user1.username 
  }
}
  






// LoggedIn():boolean{
//   const token1 = localStorage.getItem('token');
// const decoded1 = jwt_decode(token1);
//   if (this.gettoken()) {
//     if(decoded1.exp === undefined){
//       return false
//     }
//     const date = new Date(0)
//     let tokenexpdate = date.setUTCSeconds(decoded1.exp)
//     if(tokenexpdate.valueOf() > new Date().valueOf()){
   
//       // console.log(new Date().valueOf())
//       // console.log(tokenexpdate)
//       return true; // Return true if in storage
//     }
//   console.log(new Date().valueOf())
//   console.log(tokenexpdate)

// return false

// } else {
//     return false; // Return false if not in storage
// }

// }






//facebook token
// facebooktoken(token){

//   this.storeUserData(token)
// }



//     loggin(){
// if(this.gettoken()){
//   return true;
// }
// else{
//   return false
// }
//     }





    // loadToken() {
    //   const token = localStorage.getItem('id_token');
    //   this.authToken = token;
    // }
  
    // loggedIn() {
    //   return tokenNotExpired('id_token');
    // }
  
    // logout() {
    //   this.authToken = null;
    //   this.user = null;
    //   localStorage.clear();
    // }

}
