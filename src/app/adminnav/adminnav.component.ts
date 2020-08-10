import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {

  constructor(private fb: FormBuilder,private patientservice: PatientService,
    private loginservice: LoginService,  private router: Router,
    private notification:NotificationService,private flashMessage: FlashMessagesService) {

   }

  ngOnInit() {
  }
  logout(){
    this.loginservice.logout()
    this.router.navigate(['Login']);

  }
}
