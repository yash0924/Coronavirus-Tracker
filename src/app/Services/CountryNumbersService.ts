import { countrydata } from '../shared/countrydata';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
export class CountryNumbersService{

    constructor(private http : HttpClient){

    }

    totalNumerDeaths : number;
    totalNumerDealthsPerCountry : countrydata[];

    totalRecovered : number;
    totalNumerRecoveredPerCountry : countrydata[];



}