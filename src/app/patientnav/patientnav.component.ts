import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Task } from '../entites/task';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patientnav',
  templateUrl: './patientnav.component.html',
  styleUrls: ['./patientnav.component.css']
})
export class PatientnavComponent implements OnInit {
  listData: MatTableDataSource<Task>;
  public x
  displayedColumns:string[]=['sno','Activity','level','Remarks'];
  constructor( private taskservice:TaskService,private actrouter:ActivatedRoute) { }
  gettasdata:Task[];
  tab=false
  
  ngOnInit() {

    console.log(this.actrouter.snapshot.params)
    this.x=this.actrouter.snapshot.params.username
  }

  showtab(event){
    console.log(event.value)
if (event.value!="")
{
  const x={task:event.value,patuser:this.x}
  this.taskservice.gettak1(x).then((res:Task[]) => {
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
