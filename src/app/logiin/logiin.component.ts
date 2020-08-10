import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { NotificationService } from '../services/notification.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-logiin',
  templateUrl: './logiin.component.html',
  styleUrls: ['./logiin.component.css']
})
export class LogiinComponent implements OnInit {
loginform:FormGroup;
errormsg=""
  constructor(private fb: FormBuilder,private patientservice: PatientService,
    private loginservice: LoginService,  private router: Router,
    private notification:NotificationService,private flashMessage: FlashMessagesService) {

   }

  ngOnInit() {
// if(this.loginservice.loggin()){
//   console.log('logged in')
// }
// else{console.log('not logged in')}

    this.loginform = this.fb.group({
      username: [''],
      Password:['']
    })
  }

socialaccount(){
 this.loginservice.social().toPromise().then((res:any)=>{
   console.log(res)
 },
 error => {
  this.errormsg = error.message;
})
}



  onSubmit(): void{
 
    this.loginservice.login(this.loginform.value).then(
      res => {
        console.log(res)
        if ((res as any).success === false){
          
console.log('no')
 this.notification.warn((res as any).msg)
 this.router.navigate(['Login']);
        }
        else if ((res as any).success === true){
          this.notification.success('you are logged In')
        
      
           
           this.loginservice.storeUserData( (res as any).token);
          //this.loginservice.storeUserData((res as any).token);
           this.router.navigate(['profile']); 




                  }


    
  else
  {
   this.errormsg = 'Invalid Account';
  }
       
     },
     error => {
       this.errormsg = error.message;
     }
   )
  }




  // onLoginSubmit() {


  //   this.loginservice.login(this.loginform.value).subscribe(data => {
  //       if(data.success) {
  //         this.authService.storeUserData(data.token, data.user);
  //         this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
  //         this.router.navigate(['dashboard']);
  //       } else {
  //         this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
  //         this.router.navigate(['login']);
  //       }
  //   });
  // }


}
