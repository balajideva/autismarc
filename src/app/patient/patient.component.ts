import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { LoginService } from '../services/login.service';
import { NotificationService } from '../services/notification.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as jwt_decode from "jwt-decode"

import { TaskService } from '../services/task.service';
import { MatTableDataSource } from '@angular/material';
import { Taskacitivity } from '../entites/taskacitivity';
import { DatePipe } from '@angular/common';

interface Act {
  activity: string;
  sno: number;
}
interface Level {
  lev: string;
  levalue: number;
}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [DatePipe]
})
export class PatientComponent implements OnInit {
   
tabletab=false;
spiner=false;

  test: string; 
  setlist:String;
 

  public myDate = new Date()
  public ss:Taskacitivity[]
  taskform:FormGroup;
public patientid:any;
public theripstname:any;
public name:any;
public patientusername:any;
public selected:any;
tabdet=false;
one=false;
two=false;
three=false;

step=0;

listData:MatTableDataSource<any>
displayedColumns:string[]=['sno','Activity','level','Remarks'];
// displayedColumns:string[]=['sno','Activity','level','Remarks','therapist'];

  constructor(private fb: FormBuilder,private patientservice: PatientService,private datePipe: DatePipe,
    private loginservice: LoginService,  private router: Router,private taskservice:TaskService,
    private notification:NotificationService,private flashMessage: FlashMessagesService,private actrouter:ActivatedRoute) {
      this.test = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      console.log(this.test)
   }

  ngOnInit() {
    console.log(this.actrouter.snapshot.params)

// console.log(this.loginservice.userviatoken())
 this.theripstname = this.loginservice.userviatoken();

this.name = this.actrouter.snapshot.params.name;
this.patientusername = this.actrouter.snapshot.params.username;
this.patientid = this.actrouter.snapshot.params.id



    this.taskform = this.fb.group({
      // sno:[{value:0,disabled: true},[Validators.required,]],
     patientname:[{value:this.name,disabled: true},[Validators.required,]],
       date:[{value:this.test,disabled: true,},[Validators.required]],
       theripstname:[{value:this.theripstname,disabled: true},[Validators.required]],
       patientusername:[this.patientusername,[Validators.required]],
       patientid:[this.patientid,[Validators.required]],
       settingtask:['',[Validators.required]],
      // level:['',[Validators.required,]],
      // value1:[{value:'',disabled: true},[Validators.required,]],
      // Remarks:['',[Validators.required,]],
      // task:['',[Validators.required,]],

user: this.fb.array([

]),
     
       

     });


    //  this.getacttask(event)

  }




  ingridents: Act[] = [
    {activity: 'Gets the ingredients ready', sno :1},
    {activity: 'Carries the ingredients to the preparation area', sno: 2},
    {activity: 'Obtains cooking utensils and dishes from cupboards', sno: 3},
    {activity: 'Opens the containers.', sno: 4},
    {activity: 'Cuts the packet and pours into storage containers', sno: 5},
    {activity: 'Takes ingredients from containers with spoon', sno: 6},
    {activity: 'Measures ingredients', sno: 7},
    {activity: 'Pour liquid with minimum spillage from container', sno: 8},
    {activity: 'FoxAble to read labels picture or word.', sno: 9},
    {activity: 'Wears apron cap and gloves as required', sno: 10},

  ];


vegetables:Act[]=[ 
  {activity: 'Cleans the vegetables', sno :1},
  {activity: 'Sorts the vegetables', sno: 2},
  {activity: 'Cuts vegetables to size according to menu', sno: 3},
  {activity: 'Keeps hands clean during the cutting', sno: 4},
  {activity: 'Washes cutting board knife and bowls', sno: 5},
  {activity: 'Puts back board knife and bowles in the proper place', sno: 6},
  {activity: 'Sweeps floor as required', sno: 7},
  
]


cooking: Act[] = [
  {activity: 'Lights Gas', sno :1},
  {activity: 'Keeps the vessel on stove', sno: 2},
  {activity: 'Heats with oil', sno: 3},
  {activity: 'Sautés the vegetable', sno: 4},
  {activity: 'Able to use the pressure cooker', sno: 5},
  {activity: 'Rinses the ingredients', sno: 6},
  {activity: 'Soaks and squeezes tamarind with warm water', sno: 7},
  {activity: 'Follows the recipe', sno: 8},
  {activity: 'Clean the stove and vessels', sno: 9},
  {activity: 'Uses the induction stove', sno: 10},
  {activity: 'Able to strain liquids using strainer', sno: 11},
  {activity: 'Able to butter the bread', sno: 12},
  {activity: 'Able to prepare sandwich with fillings', sno: 13},
  {activity: 'Able to toast bread on pan or grill', sno: 14},
  {activity: 'Able to squeeze lemons and oranges', sno: 15},
  {activity: 'Able to mix sugars, salt, pepper other spices and mix', sno: 16},
  {activity: 'Able to deep fry', sno: 17},
  {activity: 'Able to follow methods and safety measures', sno: 18},

];


lev1:Level[]=[ 
  
    {lev: "PP", levalue:0},
    {lev: "VP", levalue:1},
    {lev: "GP", levalue:2},
    {lev: "VSP", levalue:3},
    {lev: "I", levalue:4},
    ]




i1(event){
  console.log(event.value);
 const  v =this.ingridents.find(item => (item as any).activity === event.value)
this.taskform.get('sno').setValue(v.sno)

this.selected = event.value
}

levelandval(event,index){
  console.log(index)
  console.log(event);
  console.log( (<FormArray>this.taskform.get("user")).at(index).valid);
 const  va =this.lev1.find(item => (item as any).lev === event.value);

(<FormArray>this.taskform.get("user")).at(index).get("levelval").setValue(va.levalue)


}
showtab(event){
  console.log(event.value)
  if(event.value !==""){
this.tabdet=true
if(event.value === "Ingridients"){
  this.one=true;
  this.two=false;
  this.three=false;
}
else if(event.value === "Vegetables"){
  this.one=false;
  this.two=true;
  this.three=false;
}
else if(event.value === "Cooking"){
  this.one=false;
  this.two=false;
  this.three=true;
}

  }else{
    this.tabdet=false
    this.one=false;
    this.two=false;
    this.three=false;
  }
}



  
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  back(){
    this.router.navigate(['patientlist'])
  }


reset(){
  this.taskform.get('sno').reset()
  this.taskform.get('settingtask').reset()
  this.taskform.get('level').reset()
  this.taskform.get('value1').reset()
  this.taskform.get('Remarks').reset()
  this.taskform.get('task').reset()
  this.tabdet=false
  this.one=false;
  this.two=false;
  this.three=false;
}
save(){
  console.log(this.taskform.getRawValue())

this.taskservice.regtak(this.taskform.getRawValue()).then(
  res=>{
    console.log(res)
    if((res as any).success === false){
      this.notification.warn((res as any).msg)
    }
    else{
      this.notification.success((res as any).message)
    }
  },
  error=>{
console.log(error)
  }
)


  // this.reset()
}



getacttask(x){
  this.tabletab=false
this.spiner=true
 
  // this.clearFormArray()
  this.taskservice.getactivity(x).then((res:any) => {
    console.log(res)
    if((res as any).sucess===true && (res as any).msg==="Add records to this user"){

    // console.log('kkkkk')
this.ss=(res as any).data
     this.listData = new MatTableDataSource(this.ss)

 const control = <FormArray>this.taskform.get('user');
         for (const emp of this.ss) {
           const grp = this.fb.group({
           
            //  id:[emp._id,Validators.required],
             sno:[emp.sno,Validators.required],
             acitivity: [emp.activity,Validators.required],
             acitivitytask: [emp.acitivitytask],
             level:[,Validators.required],
             levelval:[{value:'',disabled:true},[Validators.required]],
             Remarks:[,Validators.required],
             date:[this.test,Validators.required],
             patientname:[{value:this.name,disabled: true},[Validators.required,]],
             theripstname:[{value:this.theripstname,disabled: true},[Validators.required]],
             patientusername:[this.patientusername,[Validators.required]],
             patientid:[this.patientid,[Validators.required]],
            //  settingtask:['',[Validators.required]],
  
      
     
     
          
           });
           control.push(grp);
         }
this.tabletab=true
this.spiner=false
        }

        else if((res as any).sucess===true && (res as any).msg==="Already records are saved to current user" ){
          console.log(res.msg)
          this.tabletab=false
          this.spiner=false
        }

},
error => {
   console.error('Error!', error)
   })
}






  clearFormArray(){
    const control1 = (<FormArray>this.taskform.get("user"));

    
    for(let i = control1.length-1; i >= 0; i--) {
        control1.removeAt(i)
}

  }
 



ing(){
  
  this.clearFormArray()
  this.setlist="ingredient"
  this.taskform.get('settingtask').setValue(this.setlist)
  console.log( this.taskform.valid);
  console.log(this.taskform.getRawValue())
  if(this.taskform.valid){
    this.getacttask(this.taskform.getRawValue())
  }
  else{
    alert('please click on data button')
    this.router.navigate(['patientlist'])
  }

}

vege(){
  this.clearFormArray()
  this.setlist="vegetables"
  this.taskform.get('settingtask').setValue(this.setlist)
  console.log(this.taskform.getRawValue()) 
  this.getacttask(this.taskform.getRawValue())
}

cook(){
  this.clearFormArray()
  this.setlist="cooking"
  this.taskform.get('settingtask').setValue(this.setlist)
  console.log(this.taskform.getRawValue()) 
  this.getacttask(this.taskform.getRawValue())
}


save1()
{
  console.log(this.taskform.getRawValue())
}






view(){
  
    
    this.router.navigate(['patient/'+this.patientusername])

  }

}




