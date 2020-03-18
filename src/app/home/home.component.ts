import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ListOfCountryComponent } from './list-of-country/list-of-country.component';
import { CountryNumbersService } from '../Services/CountryNumbersService';
import { updatedServiceData } from '../shared/updatedServiceData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  TotalConfirmed: number = 0;
  TotalDeaths: number = 0;
  TotalRecovered: number = 0;
  TotalActive: number = 0;

  @ViewChild(ListOfCountryComponent) listCountry;

  constructor(private service : CountryNumbersService) { }

  ngOnInit() {

    this.service.numberDataUpdatedForC.subscribe((data  :updatedServiceData) => {

      this.TotalConfirmed =  +data.totalNumerC;
      this.TotalDeaths =  +data.totalNumerD;
      this.TotalRecovered =  +data.totalNumerR;
      this.TotalActive =  +data.totalNumerC - (+data.totalNumerR + +data.totalNumerD);

      //console.log(this.TotalConfirmed);
      //this. TotalDeaths = ""
      // this.TotalDeaths = data.totalNumerR;
      // this.TotalDeaths = data.totalNumerD;
      // this.TotalActive = data.totalNumerC - (data.totalNumerR + data.totalNumerD);

      
      //this.TotalDeaths = data.totalNumerR;
      // this.TotalDeaths = data.totalNumerD;
      // this.TotalActive = data.totalNumerC - (data.totalNumerR + data.totalNumerD);

      

    });
  }

  ngAfterViewInit() {
    this.TotalConfirmed = this.listCountry.tc
  }

}
