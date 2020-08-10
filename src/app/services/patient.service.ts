import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patientsno } from '../entites/patientid';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient:HttpClient) { }




  //registering a new patient save api
  private newpatient ="http://localhost:3000/api/patregister"
  patregsave(userd){
    return this.httpClient.post<any>(this.newpatient,userd,{withCredentials: true});
  
  }

  //getting the max slno in patient table
  private patientsno ="http://localhost:3000/api/patslno"
  patsno(){
    return this.httpClient.get(this.patientsno);
  }


  //getting only patients in patient table
  private patient ="http://localhost:3000/api/allpatients"
  patients(){
    return this.httpClient.get(this.patient).toPromise().then(res=>res as Patientsno[]);
  }

 //getting only patients in patient table
 private therapist ="http://localhost:3000/api/alltherapists"
 therapists(){
   return this.httpClient.get(this.therapist).toPromise().then(res=>res as Patientsno[]);
 }

// checking email
private email ="http://localhost:3000/api/checkemail"
checkemail(userd){
  return this.httpClient.post<any>(this.email,userd,{withCredentials: true});

}

private summa ="http://localhost:3000/api/protect"
pat(){
  return this.httpClient.get(this.summa);
}


}
