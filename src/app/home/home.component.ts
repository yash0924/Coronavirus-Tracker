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

  dropdownValues : string[] = [];
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

        this.TotalConfirmedT = +data.cases;
        this.TotalDeathsT = +data.deaths;
        this.TotalRecoveredT = +data.recovered;
        this.TotalActiveT = this.TotalConfirmed - (this.TotalDeaths + this.TotalRecovered);
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



  filerData(selectedCountry : string ){
   
    if(selectedCountry !== "0")
    {
      
      this.service.getLatLongBasedOnCountry(selectedCountry);

    const data = this.countriesDataCloned.filter(s => s.country === selectedCountry)
    this.TotalConfirmed = +data[0].cases;
        this.TotalDeaths = +data[0].deaths;
        this.TotalRecovered = +data[0].recovered;
        this.TotalActive = this.TotalConfirmed - (this.TotalDeaths + this.TotalRecovered);
    }
    else{
      this.TotalConfirmed = this.TotalConfirmedT;
      this.TotalDeaths = this.TotalDeathsT;
      this.TotalRecovered =this.TotalRecoveredT;
      this.TotalActive = this.TotalConfirmedT - (this.TotalDeathsT + this.TotalRecoveredT);

    }
        
  
  
  }

}
