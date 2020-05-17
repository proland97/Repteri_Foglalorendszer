import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { StartpageComponent } from './startpage/startpage.component';

import { AuthguardService } from './services/authguard/authguard.service';
import { AdminStartpageComponent } from './admin/admin-startpage/admin-startpage.component';
import { AdminGuardService } from './services/admin-guard.service';
import { CreateHotelComponent } from './admin/create-hotel/create-hotel.component';
import { ViewRatingsComponent } from './app/view-ratings/view-ratings.component';
import { ViewRoomsComponent } from './app/view-rooms/view-rooms.component';


const routes: Routes = [
  {path: '', component: WelcomepageComponent},
  
  {path: 'welcomepage', component: WelcomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app', canActivateChild: [AuthguardService], children: [
    {path: 'startpage', component: StartpageComponent},
    {path: 'ratings/:id', component: ViewRatingsComponent},
    {path: 'rooms/:id', component: ViewRoomsComponent},
    {path: 'admin', canActivateChild: [AdminGuardService], children: [
      {path: '', component: AdminStartpageComponent},
      {path: 'create', component: CreateHotelComponent},
    ]},
  ]},

  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
