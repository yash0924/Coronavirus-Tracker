import { Component, OnInit, Input } from '@angular/core';
import { countrydata } from '../../shared/countrydata';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { map, filter, first, merge } from 'rxjs/operators'
import { Subject } from 'rxjs';
import { CountryNumbersService } from '../../Services/CountryNumbersService';
import { updatedServiceData } from '../../shared/updatedServiceData';
import { countryDataGrouped } from '../../shared/countryDataGrouped';

@Component({
  selector: 'app-list-of-country',
  templateUrl: './list-of-country.component.html',
  styleUrls: ['./list-of-country.component.css']
})
export class ListOfCountryComponent implements OnInit {

  countriesDataC: countrydata[] = [];
  TotalConfirmedCases : number = 0;

  countriesDataR: countrydata[] = [];
  TotalRecoveredCases : number = 0;

   
  countriesDataD: countrydata[] = [];
  TotalDCases : number = 0;
  
  merged = [];


  //@Input() listOfCountries : countrydata[]
  // listOfCountries : countrydata[] =
  // [
  //   {

  //     Country: 'Thailand',
  //     Province: '',
  //     Lat: 15,
  //     Lon: 101,
  //     Date: '2020-01-22T00:00:00Z',
  //     Cases: 2,
  //     Status: 'confirmed'
  //   }]
  constructor(private http: HttpClient, private countryNumberService : CountryNumbersService) { }

  // sortBy(prop: string) {
  //   return this.countriesDataC.sort((a, b) => a[prop] < b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  // }


  ngOnInit() {

    this.countryNumberService.calcForC();

    let mergedData = [];
    let result = [];
    this.countryNumberService.numberDataUpdatedForC.subscribe((data  : updatedServiceData) =>{
        this.countriesDataC = data.totalCountriesC.sort((a, b) => a['Cases'] < b['Cases'] ? 1 : a['Cases'] === b['Cases'] ? 0 : -1);


      });
        
    }



}
