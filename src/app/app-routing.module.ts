import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { LogiinComponent } from './logiin/logiin.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { TherapistComponent } from './therapist/therapist.component';
import { PatientComponent } from './patient/patient.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { FacebookComponent } from './facebook/facebook.component';
import { AdminGuard } from './guards/admin.guard';
import { ListsComponent } from './list/lists/lists.component';
import { TherapistlistComponent } from './list/therapistlist/therapistlist.component';
import { PatientrecordComponent } from './patientrecord/patientrecord.component';
import { PatientGuard } from './guards/patient.guard';
import { PatientnavComponent } from './patientnav/patientnav.component';

const routes: Routes = [

  {path:'', component:HomeComponent},
  {path:'about', component:AboutComponent},


  {path:'Register', component:RegisterComponent,canActivate:[AuthGuard],data: ['admin', 'therapist']},

  {path:'patientlist', component:ListsComponent,canActivate:[AuthGuard],data: ['admin', 'therapist']},

  {path:'therapistlist', component:TherapistlistComponent,canActivate:[AdminGuard],data: ['admin']},

  {path:'Login', component:LogiinComponent},


  {path:'admin', component:AdmindashboardComponent,canActivate:[AdminGuard],data: ['admin']},

  {path:'therapist', component:TherapistComponent,canActivate:[AdminGuard],data: ['admin']},
 

  {path:'patient/:name/:username/:id', component:PatientComponent,canActivate:[AuthGuard],data: ['admin', 'therapist']},

  {path:'patient/:username', component:PatientnavComponent,canActivate:[AuthGuard],data: ['admin', 'therapist']},

  {path:'patrecord', component:PatientrecordComponent,canActivate:[PatientGuard],data: ['patient']},

  {path:'profile', component:ProfileComponent,},

  {path:'user', component:FacebookComponent,canActivate:[AuthGuard],data: ['admin', 'therapist']},

 



  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
