import { Component, OnInit, Input } from '@angular/core';
import { countrydata } from '../../shared/countrydata';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { map, filter, first } from 'rxjs/operators'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-of-country',
  templateUrl: './list-of-country.component.html',
  styleUrls: ['./list-of-country.component.css']
})
export class ListOfCountryComponent implements OnInit {

  countriesData: countrydata[] = [];
  countriesDataUpdated = new Subject<countrydata[]>();
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
  constructor(private http: HttpClient) { }

  sortBy(prop: string) {
    return this.countriesData.sort((a, b) => a[prop] < b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  ngOnInit() {

    this.countriesDataUpdated.subscribe((countriesDataUpdated : countrydata[]) => {

      this.countriesData = countriesDataUpdated
    });

    this.http.get("http://localhost:43909/countries", { headers: { 'Access-Control-Allow-Origin': '*' } }).subscribe((data: Params) => {
     // console.log(data);

      data.forEach(element => {

        
        var d1 = new Date();
        d1.setDate(d1.getDate() - 1);


        var d2 = new Date();
        d2.setDate(d2.getDate() - 2);

        var d3 = new Date();
        d3.setDate(d3.getDate() - 3);

        this.http.get("https://api.covid19api.com/total/country/" + element.Slug + "/status/confirmed",
          { headers: { 'Access-Control-Allow-Origin': '*' } })
          .pipe(map(dataUn => {

            let  filteredData = {};
            if (dataUn) {
              dataUn.forEach(element => {
                let newDate = new Date(element['Date']);
                if (newDate >= d1) {
                  filteredData = element;
                }
                else  if (newDate >= d2) {
                  filteredData = element;
                }
                else if (newDate >= d3){
                  filteredData = element;
                }
                
              });
            }
            return filteredData;
          })).subscribe((data2: countrydata) => {

              if(data2 && data2.Cases){
             
               this.TotalConfirmedCases = this.TotalConfirmedCases + data2.Cases;
               this.countriesData.push(data2);
              }
           
            //  this.countriesDataUpdated.next(data2);

          });

      });
    });




  }

}
