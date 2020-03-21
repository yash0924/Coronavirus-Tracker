
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { tileLayer } from 'leaflet';
import { latLng } from 'leaflet';
import { circle } from 'leaflet';
import { polygon } from 'leaflet';
import { marker } from 'leaflet';
import { countrymarkerdata } from '../shared/models/countrymarkerdata';
import { CountryNumbersService } from '../Services/CountryNumbersService';
import { Circle } from 'leaflet';
import { Event } from '@angular/router';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit, AfterViewInit {


  
  constructor(private service : CountryNumbersService) { }

  ngOnInit() {

   this.service.test().subscribe(data => console.log(data));
  }

 
  ngAfterViewInit(){

  }



}
