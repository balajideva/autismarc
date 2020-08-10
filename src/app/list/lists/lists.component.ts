import { Component, OnInit } from '@angular/core';
import { Patientsno } from 'src/app/entites/patientid';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  list:any;
  patients:Patientsno[]
  
  listData:MatTableDataSource<any>
    displayedColumns:string[]=['select','Patientname','father','mother','gender','dob','email','phone','address','created','Username'];
  
  constructor(private fb: FormBuilder,private patientservice: PatientService,
    private loginservice: LoginService,  private router: Router,
    private notification:NotificationService,private flashMessage: FlashMessagesService) {
  
   }
  ngOnInit() {
    this.patregistered()
  }


  patregistered(){
   
  

    this.patientservice.patients().then(
      res=>{
      console.log(res)
      this.patients=res
      this.listData = new MatTableDataSource(this.patients)
    },
    error=>{
      console.log(error);

    }
    )
   }



    patientdetail(element){
           console.log(element)
           
           this.router.navigate(['patient/'+element.name+'/'+element.username+'/'+element._id])

         }



}
