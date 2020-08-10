import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PatientService } from './services/patient.service';
import { LoginService } from './services/login.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { UserService } from './services/user.service';
import { Patientsno } from './entites/patientid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
public therapist=false;
public admin=false;
public patient=false;
  constructor(private fb: FormBuilder,private patientservice: PatientService,
    private loginservice: LoginService,  private router: Router,private activatedRouter: ActivatedRoute,
    private notification:NotificationService,private userservice:UserService) {
  
     }
  ngOnInit() {
    // console.log(this.loginservice.LoggedIn())
    this.router.events.subscribe(event =>{
      // console.log(event)
      if (event instanceof NavigationStart){
        if(this.loginservice.LoggedIn()){
          this.userservice.getUser().toPromise().then((res:any) => {
       
                if (res.username === undefined ||null||"") {
                 
                  this.loginservice.logout();
                  this.router.navigate(['/Login']);
               
                   } 
                   else {
                 
                  this.loginservice.getpermission().then((res:any)=> {
              console.log('ooooooooooo')
                      if ( res.permission === "therapist") {
          this.therapist=true
          this.admin=false
          this.patient=false
                      } 

                      else if(res.permission==="admin"){
                        this.therapist=true;
                        this.admin=true
                        this.patient=false
                      }
                      else if(res.permission==="patient"){
                        this.therapist=false;
                        this.admin=false
                        this.patient=true
                      }
        
                      else{
                        this.therapist=false
                        this.admin=false
                        this.loginservice.LoggedIn()
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
        
          
 }
        
          else{
            this.therapist=false
            this.admin=false
        
           
          }
           
          
          }
         
           

        })
            
          }













  logout(){
    this.loginservice.logout();
    this.router.navigate(['Login'])
  
  }
}



  
