import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ListOfCountryComponent } from './list-of-country/list-of-country.component';
import { CountryNumbersService } from '../Services/CountryNumbersService';
import { updatedServiceData } from '../shared/updatedServiceData';
import { Params } from '@angular/router';

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

  constructor(private service: CountryNumbersService) { }

  ngOnInit() {

    this.service.GetTotalStats().subscribe((data: Params) => {

      if (data) {
        this.TotalConfirmed = +data.cases;
        this.TotalDeaths = +data.deaths;
        this.TotalRecovered = +data.recovered;
        this.TotalActive = this.TotalConfirmed - (this.TotalDeaths + this.TotalRecovered);
      }
    });
  }

 

}
