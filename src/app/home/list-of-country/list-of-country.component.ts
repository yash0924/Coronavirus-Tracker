import { Component, OnInit, Input } from '@angular/core';
import { countrydata } from '../../shared/countrydata';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { map, filter, first } from 'rxjs/operators'
import { Subject } from 'rxjs';
import { CountryNumbersService } from '../../Services/CountryNumbersService';

@Component({
  selector: 'app-list-of-country',
  templateUrl: './list-of-country.component.html',
  styleUrls: ['./list-of-country.component.css']
})
export class ListOfCountryComponent implements OnInit {

  countriesData: countrydata[] = [];
  TotalConfirmedCases : number = 0;

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

  sortBy(prop: string) {
    return this.countriesData.sort((a, b) => a[prop] < b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }


  ngOnInit() {

    this.countryNumberService.calcForC();

    this.countryNumberService.numberDataUpdatedForC.subscribe((data ) => {

        this.TotalConfirmedCases = data.totalNumer;
        this.countriesData = data.totalNumberPerCountry;
    });

  }

}
