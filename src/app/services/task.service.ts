import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../entites/task';
import { Taskacitivity } from '../entites/taskacitivity';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient:HttpClient) { }


//register
  private task="http://localhost:3000/api/regtask"
  
  regtak(user){
    return this.httpClient.post(this.task,user,{withCredentials: true}).toPromise().then(res => {
   
      return res;
     });

}

//get task
private gettaskdata="http://localhost:3000/api/gettask"
  
gettak(x){
  return this.httpClient.post(this.gettaskdata,x,{withCredentials: true}).toPromise().then(res => {
   
    return res;
   });

  }



//get task1
private gettaskdata1="http://localhost:3000/api/gettask1"
  
gettak1(x){
  return this.httpClient.post(this.gettaskdata1,x,{withCredentials: true}).toPromise().then(res => {
   
    return res;
   });

  }



//get task acitivity

private taskactivity="http://localhost:3000/api/lists";
getactivity(data){
  return this.httpClient.post(this.taskactivity,data,{withCredentials: true}).toPromise().then(res=> {
   
    return res;
   });
}




}
