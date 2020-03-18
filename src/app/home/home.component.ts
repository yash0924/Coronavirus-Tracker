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
export class HomeComponent implements OnInit, AfterViewInit {

  TotalConfirmed: number = 0;
  TotalDeaths: number = 0;
  TotalRecovered: number = 0;
  TotalActive: number = 0;

  @ViewChild(ListOfCountryComponent) listCountry;

  constructor(private service : CountryNumbersService) { }

  ngOnInit() {

    this.service.GetTotalStats().subscribe((data  :Params) => {
      
            if(data && data.results)
      {
        this.TotalConfirmed =  +data.results[0].total_cases;
        this.TotalDeaths =  +data.results[0].total_deaths;
        this.TotalRecovered =  +data.results[0].total_recovered;
        this.TotalActive =  +data.results[0].total_unresolved;

      }

    });
  }

  ngAfterViewInit() {
    this.TotalConfirmed = this.listCountry.tc
  }

}
