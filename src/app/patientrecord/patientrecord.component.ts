import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../entites/task';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-patientrecord',
  templateUrl: './patientrecord.component.html',
  styleUrls: ['./patientrecord.component.css']
})
export class PatientrecordComponent implements OnInit {
  listData: MatTableDataSource<Task>;
  displayedColumns:string[]=['sno','Activity','level','Remarks'];
  constructor( private taskservice:TaskService) { }
  gettasdata:Task[];
  tab=false
  ngOnInit() {
  }

  showtab(event){
    console.log(event.value)
if (event.value!="")
{
  const x={task:event.value}
  this.taskservice.gettak(x).then((res:Task[]) => {
    console.log(res)
    this.tab=true
    this.gettasdata=res;
    this.listData = new MatTableDataSource(this.gettasdata)
},
error => { console.error('Error!', error) })}
else{

}

  }

}
