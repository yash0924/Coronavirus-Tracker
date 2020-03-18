import { countrydata } from '../shared/countrydata';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { map, filter, first } from 'rxjs/operators'
import { Subject, forkJoin, Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { MarkerInfo } from '../shared/MarkerInfo';
import { updatedServiceData } from '../shared/updatedServiceData';
import { countryDataGrouped } from '../shared/countryDataGrouped';
import { news } from '../shared/models/news';
import { countrymarkerdata } from '../shared/models/countrymarkerdata';
import { ArrayType } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})
export class CountryNumbersService {

     countries : string[] = ['afghanistan','albania','algeria','andorra','antigua-and-barbuda','argentina','armenia','aruba','australia','austria','azerbaijan','bahrain','bangladesh','belarus','belgium','bhutan','bolivia','bosnia-and-herzegovina','brazil','brunei','bulgaria','burkina-faso','cambodia','cameroon','canada','cayman-islands','central-african-republic','chile','china','colombia','congo-(brazzaville)','congo-(kinshasa)','costa-rica','cote-divoire','croatia','cruise-ship','cuba','curacao','cyprus','czechia','denmark','dominican-republic','ecuador','egypt','equatorial-guinea','estonia','eswatini','ethiopia','finland','france','french-guiana','gabon','georgia','germany','ghana','greece','guadeloupe','guatemala','guernsey','guinea','guyana','holy-see','honduras','hungary','iceland','india','indonesia','iran','iraq','ireland','israel','italy','jamaica','japan','jersey','jordan','kazakhstan','kenya','korea,-south','kosovo','kuwait','latvia','lebanon','liechtenstein','lithuania','luxembourg','malaysia','maldives','malta','martinique','mauritania','mexico','moldova','monaco','mongolia','morocco','namibia','nepal','netherlands','new-zealand','nigeria','north-macedonia','norway','occupied-palestinian-territory','oman','pakistan','panama','paraguay','peru','philippines','poland','portugal','qatar','reunion','romania','russia','rwanda','saint-lucia','saint-vincent-and-the-grenadines','san-marino','saudi-arabia','senegal','serbia','seychelles','singapore','slovakia','slovenia','south-africa','spain','sri-lanka','sudan','suriname','sweden','switzerland','taiwan','thailand','togo','trinidad-and-tobago','tunisia','turkey','ukraine','united-arab-emirates','united-kingdom','uruguay','us','uzbekistan','venezuela','vietnam']


    constructor(private http: HttpClient) { }

    numberDataUpdatedForC = new Subject<updatedServiceData>();
    numberDataUpdatedForR = new Subject<{ totalNumer: number, totalNumberPerCountry: countrydata[] }>();
    numberDataUpdatedForD = new Subject<{ totalNumer: number, totalNumberPerCountry: countrydata[] }>();
    markersChanged = new Subject<countrymarkerdata>();

    latestNews = new Subject<news>();

    countrySlug = new Subject<string[]>();

    totalConfirmed: number = 0;
    totalNumberConfirmedPerCountry: countrydata[] = [];

    totalNumerDeaths: number = 0;
    totalNumerDealthsPerCountry: countrydata[] = [];

    totalRecovered: number = 0;
    totalNumerRecoveredPerCountry: countrydata[] = [];

    countriesSlug : string[] = [];


    GetTotalStats(){
        return  this.http.get("https://thevirustracker.com/free-api?global=stats");
    }

    
    calcForC(){
     
        for (let index = 0; index < this.countries.length; index++) {
                const countrySelected = this.countries[index];
               // const countrySelected = 'us';

            // const recovered = this.http.get("http://localhost:43909/total/country/" + countrySelected + "/status/recovered", { headers: { 'Access-Control-Allow-Origin': '*' } });
            // const confirmed = this.http.get("http://localhost:43909/total/country/" + countrySelected + "/status/confirmed", { headers: { 'Access-Control-Allow-Origin': '*' } });
            // const death = this.http.get("http://localhost:43909/total/country/" + countrySelected + "/status/deaths", { headers: { 'Access-Control-Allow-Origin': '*' } });
            
            const recovered = this.http.get("https://recipebookapiservice20190223034351.azurewebsites.net/total/country/" + countrySelected + "/status/recovered", { headers: { 'Access-Control-Allow-Origin': '*' } });
            const confirmed = this.http.get("https://recipebookapiservice20190223034351.azurewebsites.net/total/country/" + countrySelected + "/status/confirmed", { headers: { 'Access-Control-Allow-Origin': '*' } });
            const death = this.http.get("https://recipebookapiservice20190223034351.azurewebsites.net/total/country/" + countrySelected + "/status/deaths", { headers: { 'Access-Control-Allow-Origin': '*' } });
            
            forkJoin([confirmed,recovered, death]).pipe(map(result => {

                return result;
            })).subscribe(
            result  => {

               let arryData0 = result[0] as countrydata[];
               const arryData1 = result[1] as countrydata[];
               const arryData2 = result[2] as countrydata[];

               
               let elementtoEmit : countrydata ;

               if(arryData0){
                  
                var mostRecentDate1 = new Date(Math.max.apply(null, arryData0.map( e => {
                    return new Date(e.Date);
                 })));

                 var mostRecentObject1 = arryData0.filter( e => { 
                    var d = new Date( e.Date ); 
                    return d.getTime() == mostRecentDate1.getTime();
                })[0];
               
                this.totalNumberConfirmedPerCountry.push(mostRecentObject1);
                this.totalConfirmed = this.totalConfirmed + +mostRecentObject1.Cases;

                }
            if(arryData1){
                var mostRecentDate2 = new Date(Math.max.apply(null, arryData1.map( e => {
                    return new Date(e.Date);
                 })));

                 var mostRecentObject2 = arryData1.filter( e => { 
                    var d = new Date( e.Date ); 
                    return d.getTime() == mostRecentDate2.getTime();
                })[0];

                let match = this.totalNumberConfirmedPerCountry.find(r => r.Country === mostRecentObject2.Country);

                if(match)
                {
                    const index = this.totalNumberConfirmedPerCountry.findIndex(r => r.Country === mostRecentObject2.Country);
                    this.totalNumberConfirmedPerCountry[index].tr = mostRecentObject2.Cases;
                    this.totalRecovered = this.totalRecovered + +mostRecentObject2.Cases;
                }
            }

            if(arryData2){ 
                var mostRecentDate3 = new Date(Math.max.apply(null, arryData2.map( e => {
                    return new Date(e.Date);
                 })));

                 var mostRecentObject3 = arryData2.filter( e => { 
                    var d = new Date( e.Date ); 
                    return d.getTime() == mostRecentDate3.getTime();
                })[0];

                let match2 = this.totalNumberConfirmedPerCountry.find(r => r.Country === mostRecentObject3.Country);

                if(match2)
                {
                    const index = this.totalNumberConfirmedPerCountry.findIndex(r => r.Country === mostRecentObject3.Country);

                    
                    this.totalNumberConfirmedPerCountry[index].td = mostRecentObject3.Cases;
                    let combined = +mostRecentObject3.Cases + +this.totalNumberConfirmedPerCountry[index].tr;
                    this.totalNumberConfirmedPerCountry[index].ta =  this.totalNumberConfirmedPerCountry[index].Cases - combined;

                    this.totalNumerDeaths = this.totalNumerDeaths + +mostRecentObject3.Cases;

                    elementtoEmit = this.totalNumberConfirmedPerCountry[index];
                }                   
               
              
            }
           
              this.numberDataUpdatedForC.next(new updatedServiceData(this.totalConfirmed, this.totalRecovered, this.totalNumerDeaths, elementtoEmit));

              
            });
        }

        

    }

   

   GetCurrentLocationInfo()
   {
     return this.http.get("https://www.cloudflare.com/cdn-cgi/trace'",{ headers : {'Access-Control-Allow-Origin' : '*'}});
   }

    GetMarkerInfo(map){
      
        let markersInner = [];

        
        var d2 = new Date();
        d2.setDate(d2.getDate() - 2);
        var dd2 = formatDate(d2, 'yyyy-MM-dd', 'en-US');


        this.http.get("https://recipebookapiservice20190223034351.azurewebsites.net/countries", { headers : {'Access-Control-Allow-Origin' : '*'}}).subscribe((countryData : Params) => {
          // this.http.get("https://recipebookapiservice20190223034351.azurewebsites.net/api/recipebook/Country/us/status/confirmed", { headers : {'Access-Control-Allow-Origin' : '*'}}).subscribe((data : Params) => {
         
                //Iterating through each country
                countryData.forEach((countrySelected ) => {
                    
                    const countrySlug = countrySelected.Slug;
                if(countrySlug !== "taiwan*")
                {

                    this.http.get("https://recipebookapiservice20190223034351.azurewebsites.net/country/" + countrySlug + "/status/confirmed", { headers: { 'Access-Control-Allow-Origin': '*' }})
                    .subscribe((selectedCountryCases) => {

                        let arryData0 = selectedCountryCases as countrymarkerdata[];
                      
                        var mostRecentDate = new Date(Math.max.apply(null, arryData0.map( e => {
                            return new Date(e.Date);
                         })));
        
                         var mostRecentObjects = arryData0.filter( e => { 
                            var d = new Date( e.Date ); 
                            return d.getTime() == mostRecentDate.getTime();
                        });


                        mostRecentObjects.forEach(mostRecentObject => {
                             
                        var newObj : countrymarkerdata = {
                                    
                            position: new google.maps.LatLng(mostRecentObject.Lat, mostRecentObject.Lon),
                            map: map,
                            Country : mostRecentObject.Country,
                            Province:  mostRecentObject.Province, 
                            Cases : mostRecentObject.Cases, 
                            Lat : mostRecentObject.Lat, 
                            Lon : mostRecentObject.Lon,
                            Date : mostRecentObject.Date,
                            Status : mostRecentObject.Status
                        
                         };

                        this.markersChanged.next(newObj);
                        });
                              
                    });
                }
                });

               
        });
     
    }


    getLatestNews(){




       return this.http.get("https://newsapi.org/v2/everything?q=coronavirus&sortBy=publishedAt&language=en&apiKey=0e283689abe54696987ae8a1f6537804");
    }

    getinfoOld(){
        
    //             var d = new Date();
    //             d.setDate(d.getDate());
    //             var dd = formatDate(d, 'yyyy-MM-dd', 'en-US') ;
    
    //             var d1 = new Date();
    //             d1.setDate(d1.getDate() - 1);
    //             var dd1 = formatDate(d1, 'yyyy-MM-dd', 'en-US');
    
    
    //             var d2 = new Date();
    //             d2.setDate(d2.getDate() - 2);
    //             var dd2 = formatDate(d2, 'yyyy-MM-dd', 'en-US');
    
    //             var d3 = new Date();
    //             d3.setDate(d3.getDate() - 3);
    //             var dd3 = formatDate(d3, 'yyyy-MM-dd', 'en-US');
    
    //     data.forEach(element => {
    
                        
    //                              let newDateUn = new Date(element['Date']);
    //                             let newDate = formatDate(newDateUn, 'yyyy-MM-dd', 'en-US') ;
    
    //                             if (newDate >= dd) {
    //                                 markersInner.push({
    //                                     position: new google.maps.LatLng(element.Lat, element.Lon),
    //                                     map: map,
    //                                     title: element.Province, 
    //                                     Cases : element.Cases, 
    //                                     lat : element.Lat, 
    //                                     lon : element.Lon  });
    //                             }
    //                             else if (newDate >= dd1) {
    //                                 markersInner.push({
    //                                     position: new google.maps.LatLng(element.Lat, element.Lon),
    //                                     map: map,
    //                                     title: element.Province, 
    //                                     Cases : element.Cases, 
    //                                     lat : element.Lat, 
    //                                     lon : element.Lon  });
    //                             }
    //                             else if (newDate >= dd2) {
    //                                 markersInner.push({
    //                                     position: new google.maps.LatLng(element.Lat, element.Lon),
    //                                     map: map,
    //                                     title: element.Province, 
    //                                     Cases : element.Cases, 
    //                                     lat : element.Lat, 
    //                                     lon : element.Lon  });
    //                             }
    //                             else if (newDate >= dd3) {
    //                                 markersInner.push({
    //                                     position: new google.maps.LatLng(element.Lat, element.Lon),
    //                                     map: map,
    //                                     title: element.Province, 
    //                                     Cases : element.Cases, 
    //                                     lat : element.Lat, 
    //                                     lon : element.Lon  });
    //                             }
    
         
    //     });
        
    //   // console.log( markersInner)
      //
    //     this.markersChanged.next(markersInner);
    //   });
     
    //   return markersInner;
    
    }

}