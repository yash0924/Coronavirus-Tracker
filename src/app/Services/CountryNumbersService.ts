import { countrydata } from '../shared/countrydata';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { map, filter, first } from 'rxjs/operators'
import { Subject, forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';
import { MarkerInfo } from '../shared/MarkerInfo';
import { updatedServiceData } from '../shared/updatedServiceData';

@Injectable({
    providedIn: 'root'
})
export class CountryNumbersService {

     countries : string[] = ['afghanistan','albania','algeria','andorra','antigua-and-barbuda','argentina','armenia','aruba','australia','austria','azerbaijan','bahrain','bangladesh','belarus','belgium','bhutan','bolivia','bosnia-and-herzegovina','brazil','brunei','bulgaria','burkina-faso','cambodia','cameroon','canada','cayman-islands','central-african-republic','chile','china','colombia','congo-(brazzaville)','congo-(kinshasa)','costa-rica','cote-divoire','croatia','cruise-ship','cuba','curacao','cyprus','czechia','denmark','dominican-republic','ecuador','egypt','equatorial-guinea','estonia','eswatini','ethiopia','finland','france','french-guiana','gabon','georgia','germany','ghana','greece','guadeloupe','guatemala','guernsey','guinea','guyana','holy-see','honduras','hungary','iceland','india','indonesia','iran','iraq','ireland','israel','italy','jamaica','japan','jersey','jordan','kazakhstan','kenya','korea,-south','kosovo','kuwait','latvia','lebanon','liechtenstein','lithuania','luxembourg','malaysia','maldives','malta','martinique','mauritania','mexico','moldova','monaco','mongolia','morocco','namibia','nepal','netherlands','new-zealand','nigeria','north-macedonia','norway','occupied-palestinian-territory','oman','pakistan','panama','paraguay','peru','philippines','poland','portugal','qatar','reunion','romania','russia','rwanda','saint-lucia','saint-vincent-and-the-grenadines','san-marino','saudi-arabia','senegal','serbia','seychelles','singapore','slovakia','slovenia','south-africa','spain','sri-lanka','sudan','suriname','sweden','switzerland','taiwan*','thailand','togo','trinidad-and-tobago','tunisia','turkey','ukraine','united-arab-emirates','united-kingdom','uruguay','us','uzbekistan','venezuela','vietnam']


    constructor(private http: HttpClient) { }

    numberDataUpdatedForC = new Subject<updatedServiceData>();
    numberDataUpdatedForR = new Subject<{ totalNumer: number, totalNumberPerCountry: countrydata[] }>();
    numberDataUpdatedForD = new Subject<{ totalNumer: number, totalNumberPerCountry: countrydata[] }>();
    markersChanged = new Subject<countrydata[]>();

    countrySlug = new Subject<string[]>();

    totalConfirmed: number = 0;
    totalNumberConfirmedPerCountry: countrydata[] = [];

    totalNumerDeaths: number = 0;
    totalNumerDealthsPerCountry: countrydata[] = [];

    totalRecovered: number = 0;
    totalNumerRecoveredPerCountry: countrydata[] = [];

    countriesSlug : string[] = [];

    
    calcForC(){
        
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

            for (let index = 0; index < this.countries.length; index++) {
                const countrySelected = this.countries[index];
               // const countrySelected = 'us';

            const recovered = this.http.get("http://localhost:43909/total/country/" + countrySelected + "/status/recovered", { headers: { 'Access-Control-Allow-Origin': '*' } });
            const confirmed = this.http.get("http://localhost:43909/total/country/" + countrySelected + "/status/confirmed", { headers: { 'Access-Control-Allow-Origin': '*' } });
            const death = this.http.get("http://localhost:43909/total/country/" + countrySelected + "/status/deaths", { headers: { 'Access-Control-Allow-Origin': '*' } });
                    
        forkJoin([confirmed,recovered, death]).subscribe(
            result  => {

               const arryData0 = result[0] as countrydata[];
               const arryData1 = result[1] as countrydata[];
               const arryData2 = result[2] as countrydata[];

            
               
            for (let index = 0; index < arryData0.length; index++) {
                const element = arryData0[index];

               
                let newDateUn = new Date(element['Date']);
                let newDate = formatDate(newDateUn, 'yyyy-MM-dd', 'en-US') ;


                if (newDate >= dd2) {
                    this.totalNumberConfirmedPerCountry.push(element);
                    this.totalConfirmed = this.totalConfirmed + element.Cases;
                }
               
              }


            
              for (let index = 0; index < arryData1.length; index++) {
                const element =arryData1[index];

                let newDateUn = new Date(element['Date']);
                let newDate = formatDate(newDateUn, 'yyyy-MM-dd', 'en-US') ;
             if (newDate >= dd2) {

                let match = this.totalNumberConfirmedPerCountry.find(r => r.Country === element.Country);

                if(match)
                {
                    const index = this.totalNumberConfirmedPerCountry.findIndex(r => r.Country === element.Country);
                    this.totalNumberConfirmedPerCountry[index].tr = element.Cases;
                    this.totalRecovered = this.totalRecovered + element.Cases;
                }
               
                }
              }

              for (let index = 0; index < arryData2.length; index++) {
                const element =arryData2[index];

                let newDateUn = new Date(element['Date']);
                let newDate = formatDate(newDateUn, 'yyyy-MM-dd', 'en-US') ;

               if (newDate >= dd2) {

                let match2 = this.totalNumberConfirmedPerCountry.find(r => r.Country === element.Country);

                if(match2)
                {
                    const index = this.totalNumberConfirmedPerCountry.findIndex(r => r.Country === element.Country);

                    
                    this.totalNumberConfirmedPerCountry[index].td = element.Cases;
                    let combined = +element.Cases + +this.totalNumberConfirmedPerCountry[index].tr;
                    this.totalNumberConfirmedPerCountry[index].ta =  this.totalNumberConfirmedPerCountry[index].Cases - combined;

                    this.totalNumerDeaths = this.totalNumerDeaths + element.Cases;
                }                   
                }
              }
              
              this.numberDataUpdatedForC.next(new updatedServiceData(this.totalConfirmed, this.totalRecovered, this.totalNumerDeaths, this.totalNumberConfirmedPerCountry));

            });
        }

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



    Countries :  ["afghanistan", "albania", "algeria", "andorra", "antigua-and-barbuda", "argentina", "armenia", "aruba", "australia", "austria", "azerbaijan", "bahrain", "bangladesh", "belarus", "belgium", "bhutan", "bolivia", "bosnia-and-herzegovina", "brazil", "brunei", "bulgaria", "burkina-faso", "cambodia", "cameroon", "canada", "cayman-islands", "central-african-republic", "chile", "china", "colombia", "congo-(brazzaville)", "congo-(kinshasa)", "costa-rica", "cote-divoire", "croatia", "cruise-ship", "cuba", "curacao", "cyprus", "czechia", "denmark", "dominican-republic", "ecuador", "egypt", "equatorial-guinea", "estonia", "eswatini", "ethiopia", "finland", "france", "french-guiana", "gabon", "georgia", "germany", "ghana", "greece", "guadeloupe", "guatemala", "guernsey", "guinea", "guyana", "holy-see", "honduras", "hungary", "iceland", "india", "indonesia", "iran", "iraq", "ireland", "israel", "italy", "jamaica", "japan", "jersey", "jordan", "kazakhstan", "kenya", "korea,-south", "kosovo", "kuwait", "latvia", "lebanon", "liechtenstein", "lithuania", "luxembourg", "malaysia", "maldives", "malta", "martinique", "mauritania", "mexico", "moldova", "monaco", "mongolia", "morocco", "namibia", "nepal", "netherlands", "new-zealand", …]
}