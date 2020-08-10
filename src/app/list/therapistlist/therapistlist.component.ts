import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MatTableDataSource } from '@angular/material';
import { Patientsno } from 'src/app/entites/patientid';

@Component({
  selector: 'app-therapistlist',
  templateUrl: './therapistlist.component.html',
  styleUrls: ['./therapistlist.component.css']
})
export class TherapistlistComponent implements OnInit {

therapists:Patientsno[];
  displayedColumns1:string[]=['thname','father','mother','gender','dob','email','phone','address','created','Username'];
  listData1:MatTableDataSource<any>

  constructor(private fb: FormBuilder,private patientservice: PatientService,
    private loginservice: LoginService,  private router: Router,
    private notification:NotificationService,private flashMessage: FlashMessagesService) {

   }

  ngOnInit() {
    this.therapistregistered()
  }


  therapistregistered(){
 

  
    this.patientservice.therapists().then(
      res=>{
      console.log(res)
      this.therapists=res
      this.listData1 = new MatTableDataSource(this.therapists)
    },
    error=>{
      console.log(error);

    }
    )
  }


}
