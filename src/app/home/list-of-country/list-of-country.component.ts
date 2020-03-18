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


   totalDataUpdated = new Subject<{tc: number, tr :number, td : number, ta: number}>();

  countriesDataC: coronalmaodata[] = [];
  TotalConfirmedCases : number = 0;
  order: string = 'cases';
  reverse: boolean = true;
  tc: number = 0;
  tr: number;
  td: number;
  ta: number;


  constructor(private http: HttpClient, private countryNumberService : CountryNumbersService, private orderPipe: OrderPipe) { 
    // this.sortedCollection = orderPipe.transform(this.collection, 'info.name');
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  ngOnInit() {

    this.countryNumberService.calcForC().subscribe((data : any) =>{
     
        if(data)
         {

           this.countriesDataC = data;
         }

      });
        
    }

    // filerData(searchTerm : string)
    // {
    //   this.countriesDataC = this.countriesDataC.filter(singleItem =>
    //     singleItem.Country.toLowerCase().includes(searchTerm.toLowerCase())
    //   );
    // }

}
