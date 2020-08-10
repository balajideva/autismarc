import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { Patientsno } from '../entites/patientid';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
face:Patientsno[];
public userdata=false;
 public nodata=false
  constructor(private fb: FormBuilder,private patientservice: PatientService,private userservice:UserService,
    private loginservice: LoginService,  private router: Router,private activatedRouter: ActivatedRoute,
    private notification:NotificationService) { }

  ngOnInit() {

    this.userservice.getcurrentuser().then(res => {
       
      console.log(res)
      if((res as any).success===true){
        this.face=res;
        this.userdata=true
        this.nodata=false
      }
      else if((res as any).success===false){
        this.notification.warn((res as any).message)
      }
      
    
    },
     error => { console.error('Error!', error) }
     )
   
    }






}
