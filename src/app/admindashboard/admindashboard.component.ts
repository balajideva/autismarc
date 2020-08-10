import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Patientsno } from '../entites/patientid';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  hide1=false;
  pathide = false;
  therhide=false;
  list:any;
  pant=false;
  patdata=false;
  thdata=false

  patregform:  FormGroup;
  therpregform:  FormGroup;
  patients:Patientsno[]
  therapists:Patientsno[];
  listData:MatTableDataSource<any>
  listData1:MatTableDataSource<any>
  displayedColumns:string[]=['Patientname','father','mother','gender','dob','phone','address','created','Username'];
  displayedColumns1:string[]=['thname','father','mother','gender','dob','phone','address','created','Username'];
  heading:any;
  constructor(private fb: FormBuilder,private patientservice: PatientService,
    private loginservice: LoginService,  private router: Router,
    private notification:NotificationService,private flashMessage: FlashMessagesService) {

   }


    ngOnInit() {
      // console.log(Math.floor(100 + Math.random() * 9000));
  
      let date: Date = new Date(); 
      console.log(date)
      this.patregform = this.fb.group({
        username: [''],
        Slno: [1],
          Patientname: [''],
          gender: [''],
          dob: [''],
          patientfathername: [''],
          patientmothername: [''],
          email:[''],
          phonenumber: [''],
          alternativenum: [''],
          address: [''],
          city: [''],
          state: [''],
          poscode: [''],
          country: [''],
          password: ['',[Validators.required]],
          created:[date],
          roles:['patient']
         
  
      });


      this.therpregform = this.fb.group({
        username: [''],
        Slno: [1],
         Therapistname: [''],
          gender: [''],
          dob: [''],
          Therapistfathername: [''],
          Therapistmothername: [''],
          email:[''],
          phonenumber: [''],
          alternativenum: [''],
          address: [''],
          city: [''],
          state: [''],
          poscode: [''],
          country: [''],
          password: ['',[Validators.required]],
          created:[date],
          roles:['therapist']
         
  
      });







    }
  
  

patreg(){
  this.pant=false

  console.log('patient')
  this.heading="Patient Registration" 
  this.patregform.get('roles').setValue('patient')
  this.hide1=true;
 this.pathide = true;
 this.therhide=false;

}
therpreg(){
  this.pant=false
  console.log('therapist')
  this.heading="Therapist Registration" 
  this.therpregform.get('roles').setValue('therapist')
  this.hide1=true;
  this.pathide = false;
  this.therhide=true;
}


  
  save(){
    console.log(this.patregform.value)
  
  
  
   
    this.patientservice.patregsave(this.patregform.value).toPromise().then(res => {
        
      console.log(res)
      this.notification.success(res.msg);
      this.reset();
      
    
    },
     error => { console.error('Error!', error) }
     )
  
  
  
  }
  
  reset(){
    this.patregform.reset();
    this.therpregform.reset();
    let date1: Date = new Date(); 
    this.patregform.get('created').setValue(date1)
    this.therpregform.get('created').setValue(date1)
    this.patregform.get('roles').setValue('patient')
    this.therpregform.get('roles').setValue('therapist')
  }
  
  
  
  patientslno(){
   
  
  
           this.patientservice.patsno().toPromise().then((res:Patientsno[]) => {
         
            console.log(res)
            if(res){
              
            console.log( res[0].Slno)
            var sno= res[0].Slno
            var snovalue = Number(sno)
            console.log(snovalue)
          this.patregform.get('Slno').setValue(snovalue+1)
          var a:string =this.patregform.get('Patientname').value
          this.patregform.get('username').setValue(a + (snovalue+1))
     
          this.save()
            }
            else{
              this.patregform.get('Slno').setValue(snovalue+1)
              this.patregform.get('username').setValue(a+snovalue+1)
              this.save()
            
            }
          
          },
           error => { console.error('Error!', error) }
           )
         
        }
  



        therapistslno(){
   
  
  
          this.patientservice.patsno().toPromise().then((res:Patientsno[]) => {
        
           console.log(res)
           if(res){
             
           console.log( res[0].Slno)
           var sno= res[0].Slno
           var snovalue = Number(sno)
           console.log(snovalue)
         this.therpregform.get('Slno').setValue(snovalue+1)
         var a:string =this.therpregform.get('Therapistname').value
         this.therpregform.get('username').setValue(a + (snovalue+1))
    
         this.save1()
           }
           else{
             this.therpregform.get('Slno').setValue(snovalue+1)
             this.therpregform.get('username').setValue(a+snovalue+1)
             this.save1()
           
           }
         
         },
          error => { console.error('Error!', error) }
          )
        
       }


       save1(){
        console.log(this.therpregform.value)
      
      
      
       
        this.patientservice.patregsave(this.therpregform.value).toPromise().then(res => {
            
          console.log(res)
          this.notification.success(res.msg);
          
          this.reset();
          
        
        },
         error => { console.error('Error!', error) }
         )
      
      
      
      }




      patregistered(){
        this.pant=true
        this.list="Patient List"
      this.patdata=true;
 this.thdata=false
        
        this.hide1=false;
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

      therapistregistered(){
        this.pant=true
        this.list="Therapist List"
        this.patdata=false;
        this.thdata=true;
   
        this.hide1=false;
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






  logout(){
    this.loginservice.logout()
    this.router.navigate(['Login']);

  }
}
