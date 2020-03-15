import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { Subject } from 'rxjs';
import { countrydata } from '../../shared/countrydata';

@Component({
  selector: 'app-global-map',
  templateUrl: './global-map.component.html',
  styleUrls: ['./global-map.component.css']
})
export class GlobalMapComponent implements OnInit {

 

  constructor(private http : HttpClient){}
  @ViewChild('mapContainer') gmap: ElementRef;
  map: google.maps.Map;
  lat = 40.730610;
  lng = -73.935242;

markersChanged = new Subject<countrydata[]>();

  markers = this.GetMarkerInfo();

  GetMarkerInfo(){
    let markersInner = [];
    this.http.get("http://localhost:43909/all", { headers : {'Access-Control-Allow-Origin' : '*'}}).subscribe((data : Params) => {

      // this.http.get("https://recipebookapiservice20190223034351.azurewebsites.net/api/recipebook/Country/us/status/confirmed", { headers : {'Access-Control-Allow-Origin' : '*'}}).subscribe((data : Params) => {
     
  console.log(data);

  
    data.forEach(element => {
      // console.log(element);
      markersInner.push({
        position: new google.maps.LatLng(element.Lat, element.Lon),
        map: this.map,
        title: element.Province  });
    });      
  // console.log(markersInner);
   this.markersChanged.next(data as countrydata[]);
  });
 
  return markersInner;
}



  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 3,
  };

  
 

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);

    //Adding Click event to default marker
    this.marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });

    this.marker.setMap(this.map);

     //Adding other markers
     this.loadAllMarkers();

   }
  


  ngOnInit() {


    this.mapInitializer();

    this.markersChanged.subscribe((data : countrydata[]) => {
      
      this.mapInitializer();
    });


   }

   marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      //Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      //Add click event to open info window on marker
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      //Adding marker to google map
      marker.setMap(this.map);
    });
  }

}
