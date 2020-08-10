import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { NotificationService } from '../services/notification.service';
import { Patientsno } from '../entites/patientid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  patregform:  FormGroup;
  constructor(private fb: FormBuilder,private patientservice: PatientService,
    private notification:NotificationService,) {

   }

  ngOnInit() {
    // console.log(Math.floor(100 + Math.random() * 9000));

    let date: Date = new Date(); 
    let nameregex:RegExp=/^[a-zA-Z]+$/;
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   let phoneregex:RegExp =/^\d{10}$/
   
    console.log(date)
    this.patregform = this.fb.group({
      username: [''],
      Slno: [1],
        Name: ['',[Validators.required,Validators.minLength(3),Validators.pattern(nameregex),]],
        gender: ['',[Validators.required]],
        dob: ['',[Validators.required]],
        fathername: ['',Validators.pattern(nameregex)],
        mothername: ['',Validators.pattern(nameregex)],
        email:['',[Validators.required,Validators.pattern(emailregex)]],
        phonenumber: ['',[Validators.required,Validators.pattern(phoneregex),Validators.minLength(10)]],
        alternativenum: ['',Validators.pattern(phoneregex)],
        address: ['',[Validators.required]],
        city: ['',[Validators.required,Validators.pattern(nameregex)]],
        state: ['',[Validators.required,Validators.pattern(nameregex)]],
        poscode: ['',[Validators.required,Validators.pattern('[0-9]{1,6}'),Validators.minLength(6),Validators.maxLength(6)]],
        country: ['',[Validators.required,Validators.pattern(nameregex)]],
        password: ['',[Validators.required]],
        // created:[date],
        roles:['patient',[Validators.required]]
       

    });
  }



save(){
  console.log(this.patregform.value)



 
  this.patientservice.patregsave(this.patregform.value).toPromise().then(res => {
      
    console.log(res)
    if(res.success===false){
      this.notification.warn(res.msg)
    }
    else{
      this.notification.success(res.msg);
    this.reset();
    }
    // this.notification.success(res.msg);
    // this.reset();
    
  
  },
   error => { console.error('Error!', error) }
   )



}


checkmail(event){

console.log(event.target.value)
 
const mail={email:event.target.value}
 
  this.patientservice.checkemail(mail).toPromise().then(res => {
      
    console.log(res)
  if(res.success===false){
    this.notification.warn(res.message);
    alert(res.message)
 
    this.patregform.controls['email'].reset()
  }
  else{
    // this.notification.success(res.message)
  }
 
    
  
  },
   error => { console.error('Error!', error) }
   )



}




getusername(){
  return this.patregform.get('Name').hasError('required') ? 'Name is required ' :
  this.patregform.get('Name').hasError('pattern') ? 'Name only contains characters' :
  this.patregform.get('Name').hasError('minlength') ? ' Minimum 3 characters' :'';
    

}


getErrorEmail() {
  return this.patregform.get('email').hasError('required') ? 'Field is required' :
    this.patregform.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
      this.patregform.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
}


getmobile(){
  return this.patregform.get('phonenumber').hasError('required') ? 'Mobile.no is required ' :
  this.patregform.get('phonenumber').hasError('pattern') ? 'It is not a valid mobile number.' :
  this.patregform.get('phonenumber').hasError('minlength') ? 'Enter only 10 digits.' :'';
}

getpincode(){
  return this.patregform.get('poscode').hasError('required') ? 'pincode  is required ' :
  this.patregform.get('poscode').hasError('pattern') ? 'Enter a valid pincode ' :
  this.patregform.get('poscode').hasError('maxlength') ? 'Pincode must contain only 6 digits' :
  this.patregform.get('poscode').hasError('minlength') ? 'Pincode must contain only 6 digits.' :'';
}





reset(){
  this.patregform.reset();

  this.patregform.get('roles').setValue('patient')

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
        var a:string =this.patregform.get('Name').value
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

   

}
