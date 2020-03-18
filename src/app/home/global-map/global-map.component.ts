import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { Subject } from 'rxjs';
import { countrydata } from '../../shared/countrydata';
import { CountryNumbersService } from '../../Services/CountryNumbersService';

@Component({
  selector: 'app-global-map',
  templateUrl: './global-map.component.html',
  styleUrls: ['./global-map.component.css']
})
export class GlobalMapComponent implements OnInit {

  constructor(private service : CountryNumbersService){}
  @ViewChild('mapContainer') gmap: ElementRef;
  map: google.maps.Map;
  lat = 40;
  lng = -4;

  markers = [];
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 3,
  };

  marker = new google.maps.Marker({
    //position: this.coordinates,
    map: this.map,
  });

  
  
  ngOnInit() {

    this.map = new google.maps.Map(this.gmap.nativeElement, 
      this.mapOptions);
      this.marker.setMap(this.map);

    this.service.GetMarkerInfo(this.map)

    this.service.markersChanged.subscribe((markerInfo : countrydata) => {
      
       //Creating a new marker object
      const marker = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.map,
        center:{lat : +markerInfo.Lat, lng : +markerInfo.Lon},
        radius: Math.sqrt(markerInfo.Cases) * 5000
      });



      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: "Cases : "+ markerInfo.Cases + "/n Province" + markerInfo.Province
      });

      //Add click event to open info window on marker
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      //Adding marker to google map
      marker.setMap(this.map);
    });
   }

   mapInitializer() {
    this.loadAllMarkers();
  }

  loadAllMarkers(): void {
    console.log(this.markers);
    this.markers.forEach(markerInfo => {

      
      
    });
  }

}