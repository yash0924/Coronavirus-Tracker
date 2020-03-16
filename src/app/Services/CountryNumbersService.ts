import { countrydata } from '../shared/countrydata';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { map, filter, first } from 'rxjs/operators'
import { Subject } from 'rxjs';
import { formatDate } from '@angular/common';
import { MarkerInfo } from '../shared/MarkerInfo';

@Injectable({
    providedIn: 'root'
})
export class CountryNumbersService {
    constructor(private http: HttpClient) { }

    numberDataUpdatedForC = new Subject<{ totalNumer: number, totalNumberPerCountry: countrydata[] }>();
    numberDataUpdatedForR = new Subject<{ totalNumer: number, totalNumberPerCountry: countrydata[] }>();
    numberDataUpdatedForD = new Subject<{ totalNumer: number, totalNumberPerCountry: countrydata[] }>();
    markersChanged = new Subject<countrydata[]>();

    totalConfirmed: number = 0;
    totalNumberConfirmedPerCountry: countrydata[] = [];

    totalNumerDeaths: number = 0;
    totalNumerDealthsPerCountry: countrydata[] = [];

    totalRecovered: number = 0;
    totalNumerRecoveredPerCountry: countrydata[] = [];

    
    calcForC(){
        this.http.get("http://localhost:43909/countries", { headers: { 'Access-Control-Allow-Origin': '*' } }).subscribe((data: Params) => {

            data.forEach(element => {

                var d = new Date();
                d.setDate(d.getDate());
                var dd = formatDate(d, 'yyyy-MM-dd', 'en-US') ;

                var d1 = new Date();
                d1.setDate(d1.getDate() - 1);
                var dd1 = formatDate(d1, 'yyyy-MM-dd', 'en-US');


                var d2 = new Date();
                d2.setDate(d2.getDate() - 2);
                var dd2 = formatDate(d2, 'yyyy-MM-dd', 'en-US');

                var d3 = new Date();
                d3.setDate(d3.getDate() - 3);
                var dd3 = formatDate(d3, 'yyyy-MM-dd', 'en-US');

                this.http.get("https://api.covid19api.com/total/country/" + element.Slug + "/status/confirmed",
                    { headers: { 'Access-Control-Allow-Origin': '*' } })
                    .pipe(map(dataUn => {

                        let filteredData = {};
                        if (dataUn) {
                            dataUn.forEach(element => {

                                let newDateUn = new Date(element['Date']);
                                let newDate = formatDate(newDateUn, 'yyyy-MM-dd', 'en-US') ;
                                
                                if (newDate >= dd) {
                                    filteredData = element;
                                }
                                else if (newDate >= dd1) {
                                    filteredData = element;
                                }
                                else if (newDate >= dd2) {
                                    filteredData = element;
                                }
                                else if (newDate >= dd3) {
                                    filteredData = element;
                                }

                            });
                        }
                        return filteredData;
                    })).subscribe((data2: countrydata) => {



                        if (data2 && data2.Cases) {

                         
                                    this.totalConfirmed = this.totalConfirmed + data2.Cases;
                                    this.totalNumberConfirmedPerCountry.push(data2);


                        }

                     
                                this.numberDataUpdatedForC.next({ totalNumer: this.totalConfirmed, totalNumberPerCountry: this.totalNumberConfirmedPerCountry });




                    });

            });

        });

    }

    calcForR()
    {
        this.http.get("http://localhost:43909/countries", { headers: { 'Access-Control-Allow-Origin': '*' } }).subscribe((data: Params) => {

            data.forEach(element => {

                var d = new Date();
                d.setDate(d.getDate());
                var dd = formatDate(d, 'yyyy-MM-dd', 'en-US') ;

                var d1 = new Date();
                d1.setDate(d1.getDate() - 1);
                var dd1 = formatDate(d1, 'yyyy-MM-dd', 'en-US');


                var d2 = new Date();
                d2.setDate(d2.getDate() - 2);
                var dd2 = formatDate(d2, 'yyyy-MM-dd', 'en-US');

                var d3 = new Date();
                d3.setDate(d3.getDate() - 3);
                var dd3 = formatDate(d3, 'yyyy-MM-dd', 'en-US');

                this.http.get("https://api.covid19api.com/total/country/" + element.Slug + "/status/recovered",
                    { headers: { 'Access-Control-Allow-Origin': '*' } })
                    .pipe(map(dataUn => {

                        let filteredData = {};
                        if (dataUn) {
                            dataUn.forEach(element => {
                                
                                let newDateUn = new Date(element['Date']);
                                let newDate = formatDate(newDateUn, 'yyyy-MM-dd', 'en-US') ;

                                if (newDate >= dd) {
                                    filteredData = element;
                                }
                                else if (newDate >= dd1) {
                                    filteredData = element;
                                }
                                else if (newDate >= dd2) {
                                    filteredData = element;
                                }
                                else if (newDate >= dd3) {
                                    filteredData = element;
                                }

                            });
                        }
                        return filteredData;
                    })).subscribe((data2: countrydata) => {

                        if (data2 && data2.Cases) {

                                    this.totalRecovered = this.totalRecovered + data2.Cases;
                                    this.totalNumerRecoveredPerCountry.push(data2);

                        }

                        this.numberDataUpdatedForR.next({ totalNumer: this.totalRecovered, totalNumberPerCountry: this.totalNumerRecoveredPerCountry });
                           
                    });

            });

        });

    }

    calcForD(){
        this.http.get("http://localhost:43909/countries", { headers: { 'Access-Control-Allow-Origin': '*' } }).subscribe((data: Params) => {

            data.forEach(element => {

                var d = new Date();
                d.setDate(d.getDate());
                var dd = formatDate(d, 'yyyy-MM-dd', 'en-US') ;

                var d1 = new Date();
                d1.setDate(d1.getDate() - 1);
                var dd1 = formatDate(d1, 'yyyy-MM-dd', 'en-US');


                var d2 = new Date();
                d2.setDate(d2.getDate() - 2);
                var dd2 = formatDate(d2, 'yyyy-MM-dd', 'en-US');

                var d3 = new Date();
                d3.setDate(d3.getDate() - 3);
                var dd3 = formatDate(d3, 'yyyy-MM-dd', 'en-US');

                this.http.get("https://api.covid19api.com/total/country/" + element.Slug + "/status/deaths",
                    { headers: { 'Access-Control-Allow-Origin': '*' } })
                    .pipe(map(dataUn => {

                        let filteredData = {};
                        if (dataUn) {
                            dataUn.forEach(element => {

                                let newDateUn = new Date(element['Date']);
                                let newDate = formatDate(newDateUn, 'yyyy-MM-dd', 'en-US') ;

                                if (newDate >= dd) {
                                    filteredData = element;
                                }
                                else if (newDate >= dd1) {
                                    filteredData = element;
                                }
                                else if (newDate >= dd2) {
                                    filteredData = element;
                                }
                                else if (newDate >= dd3) {
                                    filteredData = element;
                                }

                            });
                        }
                        return filteredData;
                    })).subscribe((data2: countrydata) => {



                        if (data2 && data2.Cases) {

                         
                                    this.totalNumerDeaths = this.totalNumerDeaths + data2.Cases;
                                    this.totalNumerDealthsPerCountry.push(data2);
                              

                        }

                   
                                this.numberDataUpdatedForD.next({ totalNumer: this.totalNumerDeaths, totalNumberPerCountry: this.totalNumerDealthsPerCountry });
                             


                    });

            });

        });
        
    }

    GetMarkerInfo(map){
        let markersInner = [];
        this.http.get("http://localhost:43909/all", { headers : {'Access-Control-Allow-Origin' : '*'}}).subscribe((data : Params) => {
    
          // this.http.get("https://recipebookapiservice20190223034351.azurewebsites.net/api/recipebook/Country/us/status/confirmed", { headers : {'Access-Control-Allow-Origin' : '*'}}).subscribe((data : Params) => {
         
            var d = new Date();
                d.setDate(d.getDate());
                var dd = formatDate(d, 'yyyy-MM-dd', 'en-US') ;

                var d1 = new Date();
                d1.setDate(d1.getDate() - 1);
                var dd1 = formatDate(d1, 'yyyy-MM-dd', 'en-US');


                var d2 = new Date();
                d2.setDate(d2.getDate() - 2);
                var dd2 = formatDate(d2, 'yyyy-MM-dd', 'en-US');

                var d3 = new Date();
                d3.setDate(d3.getDate() - 3);
                var dd3 = formatDate(d3, 'yyyy-MM-dd', 'en-US');

        data.forEach(element => {

                        
                                 let newDateUn = new Date(element['Date']);
                                let newDate = formatDate(newDateUn, 'yyyy-MM-dd', 'en-US') ;

                                if (newDate >= dd) {
                                    markersInner.push({
                                        position: new google.maps.LatLng(element.Lat, element.Lon),
                                        map: map,
                                        title: element.Province, 
                                        Cases : element.Cases, 
                                        lat : element.Lat, 
                                        lon : element.Lon  });
                                }
                                else if (newDate >= dd1) {
                                    markersInner.push({
                                        position: new google.maps.LatLng(element.Lat, element.Lon),
                                        map: map,
                                        title: element.Province, 
                                        Cases : element.Cases, 
                                        lat : element.Lat, 
                                        lon : element.Lon  });
                                }
                                else if (newDate >= dd2) {
                                    markersInner.push({
                                        position: new google.maps.LatLng(element.Lat, element.Lon),
                                        map: map,
                                        title: element.Province, 
                                        Cases : element.Cases, 
                                        lat : element.Lat, 
                                        lon : element.Lon  });
                                }
                                else if (newDate >= dd3) {
                                    markersInner.push({
                                        position: new google.maps.LatLng(element.Lat, element.Lon),
                                        map: map,
                                        title: element.Province, 
                                        Cases : element.Cases, 
                                        lat : element.Lat, 
                                        lon : element.Lon  });
                                }

         
        });
        
      // console.log( markersInner)
      
        this.markersChanged.next(markersInner);
      });
     
      return markersInner;
    }
}