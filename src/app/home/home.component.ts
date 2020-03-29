import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ListOfCountryComponent } from './list-of-country/list-of-country.component';
import { CountryNumbersService } from '../Services/CountryNumbersService';
import { updatedServiceData } from '../shared/updatedServiceData';
import { Params } from '@angular/router';
import { coronalmaodata } from '../shared/models/coronalmaodata';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  TotalConfirmed: number = 0;
  TotalDeaths: number = 0;
  TotalRecovered: number = 0;
  TotalActive: number = 0;

  TotalConfirmedT: number = 0;
  TotalDeathsT: number = 0;
  TotalRecoveredT: number = 0;
  TotalActiveT: number = 0;

  TotalNumbersArray: number[] = [];

  dropdownValues: string[] = [];
  countriesDataC: coronalmaodata[] = [];
  countriesDataCloned: coronalmaodata[] = [];
  constructor(private service: CountryNumbersService) { }

  ngOnInit() {

    this.service.GetTotalStats().subscribe((data: Params) => {

      if (data) {
        this.TotalConfirmed = +data.cases;
        this.TotalDeaths = +data.deaths;
        this.TotalRecovered = +data.recovered;
        this.TotalActive = this.TotalConfirmed - (this.TotalDeaths + this.TotalRecovered);

        this.TotalNumbersArray = [this.TotalConfirmed, this.TotalDeaths, this.TotalRecovered, this.TotalActive]

       
      }
    });


    this.service.calcForC().subscribe((data: any) => {
      if (data) {
        this.countriesDataC = data;
        this.countriesDataCloned = data;
        this.dropdownValues = data.map(s => s.country)
      }
    });

    

  }

  countryFilterApplied(a : number[]){
    console.log(a);
    this.TotalNumbersArray = [a[0], a[1], a[2], a[3]]
  }
}
