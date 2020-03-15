import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

import { AgmCoreModule } from '@agm/core';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ListOfCountryComponent } from './home/list-of-country/list-of-country.component'
import { GlobalMapComponent } from './home/global-map/global-map.component';
import { DeathNumberComponent } from './home/death-number/death-number.component';
import { RecoveredNumberComponent } from './home/recovered-number/recovered-number.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    GlobalMapComponent,
    HomeComponent,
    ListOfCountryComponent,
    DeathNumberComponent,
    RecoveredNumberComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcd6J-qAfnmGjqBrC5poqV-8fa7LerguQ',
      libraries: ['places'] 
    }),

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
