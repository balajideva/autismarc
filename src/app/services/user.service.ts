import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Patientsno } from '../entites/patientid';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient,private loginservice:LoginService) { }

  private protect ="http://localhost:3000/api/protect"
 

  getUser() {
    // Check first if user has a token
    if (this.loginservice.LoggedIn()) {
      return this.httpClient.get(this.protect)
    } else {
        console.log({ message: 'User has no token' }); // Reject if no token exists
    }
};

//get current user
private curruser = "http://localhost:3000/api/currentuser";
getcurrentuser(){
  return this.httpClient.get(this.curruser).toPromise().then(res=>res as Patientsno[]);
}

}
