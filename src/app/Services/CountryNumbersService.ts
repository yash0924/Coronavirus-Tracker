import { countrydata } from '../shared/countrydata';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { map, filter, first } from 'rxjs/operators'
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CountryNumbersService {
    constructor(private http: HttpClient) { }

    numberDataUpdatedForC = new Subject<{ totalNumer: number, totalNumberPerCountry: countrydata[] }>();
    numberDataUpdatedForR = new Subject<{ totalNumer: number, totalNumberPerCountry: countrydata[] }>();
    numberDataUpdatedForD = new Subject<{ totalNumer: number, totalNumberPerCountry: countrydata[] }>();

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

                var d1 = new Date();
                d1.setDate(d1.getDate() - 1);


                var d2 = new Date();
                d2.setDate(d2.getDate() - 2);

                var d3 = new Date();
                d3.setDate(d3.getDate() - 3);

                this.http.get("https://api.covid19api.com/total/country/" + element.Slug + "/status/confirmed",
                    { headers: { 'Access-Control-Allow-Origin': '*' } })
                    .pipe(map(dataUn => {

                        let filteredData = {};
                        if (dataUn) {
                            dataUn.forEach(element => {
                                let newDate = new Date(element['Date']);
                                if (newDate >= d) {
                                    filteredData = element;
                                }
                                else if (newDate >= d1) {
                                    filteredData = element;
                                }
                                else if (newDate >= d2) {
                                    filteredData = element;
                                }
                                else if (newDate >= d3) {
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

                var d1 = new Date();
                d1.setDate(d1.getDate() - 1);


                var d2 = new Date();
                d2.setDate(d2.getDate() - 2);

                var d3 = new Date();
                d3.setDate(d3.getDate() - 3);

                this.http.get("https://api.covid19api.com/total/country/" + element.Slug + "/status/recovered",
                    { headers: { 'Access-Control-Allow-Origin': '*' } })
                    .pipe(map(dataUn => {

                        let filteredData = {};
                        if (dataUn) {
                            dataUn.forEach(element => {
                                let newDate = new Date(element['Date']);
                                if (newDate >= d) {
                                    filteredData = element;
                                }
                                else if (newDate >= d1) {
                                    filteredData = element;
                                }
                                else if (newDate >= d2) {
                                    filteredData = element;
                                }
                                else if (newDate >= d3) {
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

                var d1 = new Date();
                d1.setDate(d1.getDate() - 1);


                var d2 = new Date();
                d2.setDate(d2.getDate() - 2);

                var d3 = new Date();
                d3.setDate(d3.getDate() - 3);

                this.http.get("https://api.covid19api.com/total/country/" + element.Slug + "/status/deaths",
                    { headers: { 'Access-Control-Allow-Origin': '*' } })
                    .pipe(map(dataUn => {

                        let filteredData = {};
                        if (dataUn) {
                            dataUn.forEach(element => {
                                let newDate = new Date(element['Date']);
                                if (newDate >= d) {
                                    filteredData = element;
                                }
                                else if (newDate >= d1) {
                                    filteredData = element;
                                }
                                else if (newDate >= d2) {
                                    filteredData = element;
                                }
                                else if (newDate >= d3) {
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

    
}