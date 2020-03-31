import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ListOfCountryComponent } from './home/list-of-country/list-of-country.component'
import { GlobalMapComponent } from './home/global-map/global-map.component';

import { RecoveredNumberComponent } from './home/recovered-number/recovered-number.component';
import { CountryNumbersService } from './Services/CountryNumbersService';
import { FormsModule } from '@angular/forms';
import { FilterpipePipe } from './shared/filterpipe.pipe';
import { HowtostaysafeComponent } from './howtostaysafe/howtostaysafe.component';
import { ImportantnewsComponent } from './importantnews/importantnews.component';
import { DatasourceComponent } from './datasource/datasource.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { i1Interceptor } from './shared/interceptors/i1';
import { LoaderComponent } from './shared/loader/loader.component';
import { OrderByPipe } from './shared/order-by.pipe';
import { TotalNumbersComponent } from './home/total-numbers/total-numbers.component';
import { CountryFilterComponent } from './home/country-filter/country-filter.component';
import { MarkerDirective } from './shared/marker.directive';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    GlobalMapComponent,
    HomeComponent,
    ListOfCountryComponent,
    RecoveredNumberComponent,
    FilterpipePipe,
    OrderByPipe,
    HowtostaysafeComponent,
    ImportantnewsComponent,
    DatasourceComponent,
    AboutmeComponent,
    LoaderComponent,
    TotalNumbersComponent,
    CountryFilterComponent,
    MarkerDirective
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcd6J-qAfnmGjqBrC5poqV-8fa7LerguQ',
      libraries: ['places'] 
    }),

    AppRoutingModule,
    FormsModule,
    LeafletModule.forRoot(),
    DeviceDetectorModule.forRoot(),
     
    
    
  ],
   providers: [CountryNumbersService
  ,
     {
    provide : HTTP_INTERCEPTORS,
    useClass : i1Interceptor,
    multi : true
  }
  //,
  // {
  //   provide : HTTP_INTERCEPTORS,
  //   useClass : i2Interceptor,
  //   multi : true
  // }
  
],
  bootstrap: [AppComponent]
})
export class AppModule { }
