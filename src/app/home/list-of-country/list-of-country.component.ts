import { Component, OnInit, Input, AfterContentInit, AfterViewInit } from '@angular/core';
import { countrydata } from '../../shared/countrydata';
import { HttpClient } from '@angular/common/http';
import { Params, Event } from '@angular/router';
import { map, filter, first, merge } from 'rxjs/operators'
import { Subject } from 'rxjs';
import { CountryNumbersService } from '../../Services/CountryNumbersService';
import { updatedServiceData } from '../../shared/updatedServiceData';
import { countryDataGrouped } from '../../shared/countryDataGrouped';

import { OrderPipe } from 'ngx-order-pipe';
import { coronalmaodata } from '../../shared/models/coronalmaodata';

@Component({
  selector: 'app-list-of-country',
  templateUrl: './list-of-country.component.html',
  styleUrls: ['./list-of-country.component.css']
})
export class ListOfCountryComponent implements OnInit {

  countriesDataC: coronalmaodata[] = [];
  countriesDataCloned: coronalmaodata[] = [];
  order: string = 'cases';
  reverse: boolean = true;
  dropdownValues : string[] = [];
  
  constructor(private http: HttpClient, private countryNumberService: CountryNumbersService, private orderPipe: OrderPipe) {
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

ngOnInit() {
    this.countryNumberService.calcForC().subscribe((data: any) => {
      if (data) {
        this.countriesDataC = data;
        this.countriesDataCloned = data;
        this.dropdownValues = data.map(s => s.country)
      }
    });
  }

  
loadMapInfo(country : string){

    this.countryNumberService.getLatLongBasedOnCountry(country);

}

filterData(selectedCountry : string)
{
  if(selectedCountry !== "0")
  {
    this.countryNumberService.getLatLongBasedOnCountry(selectedCountry);
    this.countriesDataCloned =  this.countriesDataC.filter(s => s.country === selectedCountry)
    
  }
  else
  {
    this.countryNumberService.getLatLongBasedOnCountry("All");
    this.countriesDataCloned =  this.countriesDataC;

  }
  

}
}

