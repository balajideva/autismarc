import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb: FormBuilder,private patientservice: PatientService,
    private loginservice: LoginService,  private router: Router,
    private notification:NotificationService,) {
      console.log(this.loginservice.LoggedIn())
     }

  ngOnInit() {
  }

}
