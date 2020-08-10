import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FirstnavComponent } from './firstnav/firstnav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LogiinComponent } from './logiin/logiin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { TherapistComponent } from './therapist/therapist.component';
import { PatientComponent } from './patient/patient.component';
import { PatientnavComponent } from './patientnav/patientnav.component';
import { TheraphistnavComponent } from './theraphistnav/theraphistnav.component';
import { AdminnavComponent } from './adminnav/adminnav.component';

import { PatientlistComponent } from './componentss/patientlist/patientlist.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginService } from './services/login.service';
import { NotificationService } from './services/notification.service';
import { PatientService } from './services/patient.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { FacebookComponent } from './facebook/facebook.component';
import { ListsComponent } from './list/lists/lists.component';
import { TherapistlistComponent } from './list/therapistlist/therapistlist.component';
import { PatientrecordComponent } from './patientrecord/patientrecord.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    PageNotFoundComponent,
    FirstnavComponent,
    HomeComponent,
    AboutComponent,
    LogiinComponent,
    AdmindashboardComponent,
    TherapistComponent,
    PatientComponent,
    PatientnavComponent,
    TheraphistnavComponent,
    AdminnavComponent,
  
    PatientlistComponent,
  
    ProfileComponent,
  
    FacebookComponent,
  
    ListsComponent,
  
    TherapistlistComponent,
  
    PatientrecordComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,MaterialModule,FormsModule,ReactiveFormsModule,HttpClientModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [LoginService,NotificationService,PatientService,AuthGuard,
  {
provide:HTTP_INTERCEPTORS,
useClass:TokenInterceptorService,
multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
