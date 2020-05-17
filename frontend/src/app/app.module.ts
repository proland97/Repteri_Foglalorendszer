import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartpageComponent } from './startpage/startpage.component';
import { LoginComponent } from './login/login.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { ErrorComponent } from './error/error.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminStartpageComponent } from './admin/admin-startpage/admin-startpage.component';
import { CreateHotelComponent } from './admin/create-hotel/create-hotel.component';
import { HomeComponent } from './admin/home/home.component';
import { ViewRatingsComponent } from './app/view-ratings/view-ratings.component';
import { ViewRoomsComponent } from './app/view-rooms/view-rooms.component';
import { UserHomeComponent } from './app/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    StartpageComponent,
    LoginComponent,
    WelcomepageComponent,
    ErrorComponent,
    LogoutComponent,
    AdminStartpageComponent,
    CreateHotelComponent,
    HomeComponent,
    ViewRatingsComponent,
    ViewRoomsComponent,
    UserHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
