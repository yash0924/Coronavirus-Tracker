import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryNumbersService } from '../../Services/CountryNumbersService';
import { countrydata } from '../../shared/countrydata';

@Component({
  selector: 'app-recovered-number',
  templateUrl: './recovered-number.component.html',
  styleUrls: ['./recovered-number.component.css']
})
export class RecoveredNumberComponent implements OnInit {

  countriesData: countrydata[] = [];
  TotalRecoveredCases : number = 0;

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

    this.countryNumberService.calcForR();

    this.countryNumberService.numberDataUpdatedForR.subscribe((data ) => {

        this.TotalRecoveredCases = data.totalNumer;
        this.countriesData = data.totalNumberPerCountry;
    });

  }


}
