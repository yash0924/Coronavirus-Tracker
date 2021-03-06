import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryNumbersService } from '../../Services/CountryNumbersService';
import { countrymarkerdata } from '../../shared/models/countrymarkerdata';
import { tileLayer, latLng, Circle } from 'leaflet';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-global-map',
  templateUrl: './global-map.component.html',
  styleUrls: ['./global-map.component.css']
})
export class GlobalMapComponent implements OnInit {
  mapCenter: any;
  deviceInfo: any;
  zoom: number = 0;

  constructor(private service : CountryNumbersService, private http : HttpClient, private deviceService: DeviceDetectorService) {
    this.epicFunction();
  }

  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();

    const isMobile = this.deviceService.isMobile();

    if(isMobile)
    {
      this.zoom = 4;
    }
    else{
      this.zoom =  2.5;
    }
  }
  
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, minZoom : 2.5, attribution: '...' })
    ],
    zoom: this.zoom,
    center: latLng(41.6005, -93.6091)
  };

  layers = [];
  

  @ViewChild('mapContainer') gmap: ElementRef;
  map: google.maps.Map;
  lat = 41.6005;
  lng = -93.6091;

  markers = [];
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 3,
    mapTypeId: 'terrain'
  };

 
  
  ngOnInit() {

    
    console.log(this.deviceInfo);

    
    // this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
     
    this.service.GetMarkerInfo(this.map)

    this.service.markSelectedCountry.subscribe((data: any) => {

      this.mapCenter =  latLng(+data.lat,  +data.lon) ;

    });

    this.service.markersChanged.subscribe((markerInfo : countrymarkerdata) => {
      const countryproviencinfo = markerInfo.Province ? markerInfo.Province : markerInfo.Country;
      this.layers.push(new Circle([ +markerInfo.Lat,  +markerInfo.Lon ], { radius: Math.sqrt(markerInfo.Cases) * 5000 }).bindPopup("<div><h4>"+  countryproviencinfo +"<h4> <hr /><h5>Cases : "+ markerInfo.Cases+"</h5></div>"))
      
      //  //Creating a new marker object
      // const marker = new google.maps.Circle({
        
      //   strokeColor: '#FF0000',
      //   strokeOpacity: 0.8,
      //   strokeWeight: 2,
      //   fillColor: '#FF0000',
      //   fillOpacity: 0.35,
      //   map: this.map,
      //   center:{lat : +markerInfo.Lat, lng : +markerInfo.Lon},
      //   radius: Math.sqrt(markerInfo.Cases) * 5000
      // });



      // //creating a new info window with markers info
      // const countryproviencinfo = markerInfo.Province ? markerInfo.Province : markerInfo.Country;
      // const infoWindow = new google.maps.InfoWindow({
      //   content: '<div><h4>'+  countryproviencinfo +'<h4> <hr /><h5>Cases : '+ markerInfo.Cases+'</h5></div>'
      // });

      // //Add click event to open info window on marker
      // marker.addListener("click", () => {

      //   infoWindow.close();
        
      //   this.map.setZoom(4);
      //   this.map.setCenter(marker.getCenter());

      //   infoWindow.setPosition(marker.getCenter());
      //   infoWindow.open(this.map);
      // });

      // //Adding marker to google map
      // marker.setMap(this.map);
    });
   }



}