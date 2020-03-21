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
import { latloninfo } from '../shared/models/latlonginfo';

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
    markSelectedCountry = new Subject<{lat : number,lon : number}>();

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
        return  this.http.get("https://corona.lmao.ninja/all");
    }
    test(){
        return  this.http.get("http://www.globalscrap.com/GS2019/livefeed_sfe.asp",{responseType: 'text'});
    }
    getLatLongBasedOnCountry(country)
    {
        const selectedcon = this.latlongInfoData.filter(s => s.country.toLowerCase() === country.toLowerCase());
        if(selectedcon.length > 0)
        {
         
            this.markSelectedCountry.next({lat : selectedcon[0]['lat'],  lon : selectedcon[0]['lon']})
        }
        else{
            console.log(country + " not found");
        }

    }

   

    
    calcForC(){

       return  this.http.get("https://corona.lmao.ninja/countries");
     
        // for (let index = 0; index < this.countries.length; index++) {
        //         const countrySelected = this.countries[index];
        //        // const countrySelected = 'us';

        //     // const recovered = this.http.get("http://localhost:43909/total/country/" + countrySelected + "/status/recovered", { headers: { 'Access-Control-Allow-Origin': '*' } });
        //     // const confirmed = this.http.get("http://localhost:43909/total/country/" + countrySelected + "/status/confirmed", { headers: { 'Access-Control-Allow-Origin': '*' } });
        //     // const death = this.http.get("http://localhost:43909/total/country/" + countrySelected + "/status/deaths", { headers: { 'Access-Control-Allow-Origin': '*' } });
            
        //     const recovered = this.http.get("https://recipebookapiservice20190223034351.azurewebsites.net/total/country/" + countrySelected + "/status/recovered", { headers: { 'Access-Control-Allow-Origin': '*' } });
        //     const confirmed = this.http.get("https://recipebookapiservice20190223034351.azurewebsites.net/total/country/" + countrySelected + "/status/confirmed", { headers: { 'Access-Control-Allow-Origin': '*' } });
        //     const death = this.http.get("https://recipebookapiservice20190223034351.azurewebsites.net/total/country/" + countrySelected + "/status/deaths", { headers: { 'Access-Control-Allow-Origin': '*' } });
           
        //     // const recovered = this.http.get("https://api.covid19api.com/total/country/" + countrySelected + "/status/recovered", { headers: { 'Access-Control-Allow-Origin': '*' } });
        //     // const confirmed = this.http.get("https:/api.covid19api.com/total/country/" + countrySelected + "/status/confirmed", { headers: { 'Access-Control-Allow-Origin': '*' } });
        //     // const death = this.http.get("https://api.covid19api.com/total/country/" + countrySelected + "/status/deaths", { headers: { 'Access-Control-Allow-Origin': '*' } });
           


        //     forkJoin([confirmed,recovered, death]).pipe(map(result => {

        //         return result;
        //     })).subscribe(
        //     result  => {

        //        let arryData0 = result[0] as countrydata[];
        //        const arryData1 = result[1] as countrydata[];
        //        const arryData2 = result[2] as countrydata[];

               
        //        let elementtoEmit : countrydata ;

        //        if(arryData0){
                  
        //         var mostRecentDate1 = new Date(Math.max.apply(null, arryData0.map( e => {
        //             return new Date(e.Date);
        //          })));

        //          var mostRecentObject1 = arryData0.filter( e => { 
        //             var d = new Date( e.Date ); 
        //             return d.getTime() == mostRecentDate1.getTime();
        //         })[0];
               
        //         this.totalNumberConfirmedPerCountry.push(mostRecentObject1);
        //         this.totalConfirmed = this.totalConfirmed + +mostRecentObject1.Cases;

        //         }
        //     if(arryData1){
        //         var mostRecentDate2 = new Date(Math.max.apply(null, arryData1.map( e => {
        //             return new Date(e.Date);
        //          })));

        //          var mostRecentObject2 = arryData1.filter( e => { 
        //             var d = new Date( e.Date ); 
        //             return d.getTime() == mostRecentDate2.getTime();
        //         })[0];

        //         let match = this.totalNumberConfirmedPerCountry.find(r => r.Country === mostRecentObject2.Country);

        //         if(match)
        //         {
        //             const index = this.totalNumberConfirmedPerCountry.findIndex(r => r.Country === mostRecentObject2.Country);
        //             this.totalNumberConfirmedPerCountry[index].tr = mostRecentObject2.Cases;
        //             this.totalRecovered = this.totalRecovered + +mostRecentObject2.Cases;
        //         }
        //     }

        //     if(arryData2){ 
        //         var mostRecentDate3 = new Date(Math.max.apply(null, arryData2.map( e => {
        //             return new Date(e.Date);
        //          })));

        //          var mostRecentObject3 = arryData2.filter( e => { 
        //             var d = new Date( e.Date ); 
        //             return d.getTime() == mostRecentDate3.getTime();
        //         })[0];

        //         let match2 = this.totalNumberConfirmedPerCountry.find(r => r.Country === mostRecentObject3.Country);

        //         if(match2)
        //         {
        //             const index = this.totalNumberConfirmedPerCountry.findIndex(r => r.Country === mostRecentObject3.Country);

                    
        //             this.totalNumberConfirmedPerCountry[index].td = mostRecentObject3.Cases;
        //             let combined = +mostRecentObject3.Cases + +this.totalNumberConfirmedPerCountry[index].tr;
        //             this.totalNumberConfirmedPerCountry[index].ta =  this.totalNumberConfirmedPerCountry[index].Cases - combined;

        //             this.totalNumerDeaths = this.totalNumerDeaths + +mostRecentObject3.Cases;

        //             elementtoEmit = this.totalNumberConfirmedPerCountry[index];
        //         }                   
               
              
        //     }
           
        //       this.numberDataUpdatedForC.next(new updatedServiceData(this.totalConfirmed, this.totalRecovered, this.totalNumerDeaths, elementtoEmit));

              
        //     });
        // }

        

    }

   

   GetCurrentLocationInfo()
   {
     return this.http.get("https://recipebookapiservice20190223034351.azurewebsites.net/ipinfo",{ headers : {'Access-Control-Allow-Origin' : '*'}});
   }

    GetMarkerInfo(map){
      
        this.http.get("https://coronavirus-tracker-api.herokuapp.com/v2/locations").subscribe((data :Params) => {

                    data.locations.forEach(obj => {

                               
                        var newObj : countrymarkerdata = {
                                                                
                            Country : obj.country,
                            Province:  obj.province, 
                            Cases : obj.latest.confirmed, 
                            Lat : obj.coordinates.latitude, 
                            Lon : obj.coordinates.longitude,
                            Date : new Date(),
                            Status : 'confirmed'
                        
                         };

                        this.markersChanged.next(newObj);

                    });

                });

        // let markersInner = [];

        
        // var d2 = new Date();
        // d2.setDate(d2.getDate() - 2);
        // var dd2 = formatDate(d2, 'yyyy-MM-dd', 'en-US');


        // this.http.get("https://api.covid19api.com/countries", { headers : {'Access-Control-Allow-Origin' : '*'}}).subscribe((countryData : Params) => {
        //   // this.http.get("https://recipebookapiservice20190223034351.azurewebsites.net/api/recipebook/Country/us/status/confirmed", { headers : {'Access-Control-Allow-Origin' : '*'}}).subscribe((data : Params) => {
         
        //   if(countryData && countryData.toString() != 'null')
        //   {
        //         //Iterating through each country
        //         countryData.forEach((countrySelected ) => {
                    
        //             const countrySlug = countrySelected.Slug;
        //         if(countrySlug !== "taiwan*")
        //         {

        //             this.http.get("https://api.covid19api.com/country/" + countrySlug + "/status/confirmed", { headers: { 'Access-Control-Allow-Origin': '*' }})
        //             .subscribe((selectedCountryCases) => {

        //                 let arryData0 = selectedCountryCases as countrymarkerdata[];
                      
        //                 var mostRecentDate = new Date(Math.max.apply(null, arryData0.map( e => {
        //                     return new Date(e.Date);
        //                  })));
        
        //                  var mostRecentObjects = arryData0.filter( e => { 
        //                     var d = new Date( e.Date ); 
        //                     return d.getTime() == mostRecentDate.getTime();
        //                 });


        //                 mostRecentObjects.forEach(mostRecentObject => {
                             
        //                 var newObj : countrymarkerdata = {
                                    
        //                     position: new google.maps.LatLng(mostRecentObject.Lat, mostRecentObject.Lon),
        //                     map: map,
        //                     Country : mostRecentObject.Country,
        //                     Province:  mostRecentObject.Province, 
        //                     Cases : mostRecentObject.Cases, 
        //                     Lat : mostRecentObject.Lat, 
        //                     Lon : mostRecentObject.Lon,
        //                     Date : mostRecentObject.Date,
        //                     Status : mostRecentObject.Status
                        
        //                  };

        //                 this.markersChanged.next(newObj);
        //                 });
                              
        //             });
        //         }
        //         });
        //     }
        //     else{

                
        //     }
               
        // });
     
    }


    getLatestNews(){
       //return this.http.get("https://newsapi.org/v2/top-headlines?q=coronavirus&country=us&country=uk&country=ch&country=in&sortBy=publishedAt&language=en&apiKey=0e283689abe54696987ae8a1f6537804", { headers : {'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Headers' : '*'}});

       const url = "https://newsapi.org/v2/top-headlines?q=coronavirus&country=us&country=uk&country=ch&country=in&sortBy=publishedAt&language=en&apiKey=0e283689abe54696987ae8a1f6537804";
   // const url = "https://recipebookapiservice20190223034351.azurewebsites.net/news";

       return this.http.get(url, {headers : {                                         
'Access-Control-Allow-Headers' : 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'}});
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


    latlongInfoData : latloninfo[]  = [
        new latloninfo('AD',42.546245,1.601554,'Andorra'),
        new latloninfo('AE',23.424076,53.847818,'UAE'),
        new latloninfo('AF',33.93911,67.709953,'Afghanistan'),
        new latloninfo('AG',17.060816,-61.796428,'Antigua and Barbuda'),
        new latloninfo('AI',18.220554,-63.068615,'Anguilla'),
        new latloninfo('AL',41.153332,20.168331,'Albania'),
        new latloninfo('AM',40.069099,45.038189,'Armenia'),
        new latloninfo('AN',12.226079,-69.060087,'Netherlands Antilles'),
        new latloninfo('AO',-11.202692,17.873887,'Angola'),
        new latloninfo('AQ',-75.250973,-0.071389,'Antarctica'),
        new latloninfo('AR',-38.416097,-63.616672,'Argentina'),
        new latloninfo('AS',-14.270972,-170.132217,'American Samoa'),
        new latloninfo('AT',47.516231,14.550072,'Austria'),
        new latloninfo('AU',-25.274398,133.775136,'Australia'),
        new latloninfo('AW',12.52111,-69.968338,'Aruba'),
        new latloninfo('AZ',40.143105,47.576927,'Azerbaijan'),
        new latloninfo('BA',43.915886,17.679076,'Bosnia and Herzegovina'),
        new latloninfo('BB',13.193887,-59.543198,'Barbados'),
        new latloninfo('BD',23.684994,90.356331,'Bangladesh'),
        new latloninfo('BE',50.503887,4.469936,'Belgium'),
        new latloninfo('BF',12.238333,-1.561593,'Burkina Faso'),
        new latloninfo('BG',42.733883,25.48583,'Bulgaria'),
        new latloninfo('BH',25.930414,50.637772,'Bahrain'),
        new latloninfo('BI',-3.373056,29.918886,'Burundi'),
        new latloninfo('BJ',9.30769,2.315834,'Benin'),
        new latloninfo('BM',32.321384,-64.75737,'Bermuda'),
        new latloninfo('BN',4.535277,114.727669,'Brunei'),
        new latloninfo('BO',-16.290154,-63.588653,'Bolivia'),
        new latloninfo('BR',-14.235004,-51.92528,'Brazil'),
        new latloninfo('BS',25.03428,-77.39628,'Bahamas'),
        new latloninfo('BT',27.514162,90.433601,'Bhutan'),
        new latloninfo('BV',-54.423199,3.413194,'Bouvet Island'),
        new latloninfo('BW',-22.328474,24.684866,'Botswana'),
        new latloninfo('BY',53.709807,27.953389,'Belarus'),
        new latloninfo('BZ',17.189877,-88.49765,'Belize'),
        new latloninfo('CA',56.130366,-106.346771,'Canada'),
        new latloninfo('CC',-12.164165,96.870956,'Cocos [Keeling] Islands'),
        new latloninfo('CD',-4.038333,21.758664,'Congo [DRC]'),
        new latloninfo('CF',6.611111,20.939444,'Central African Republic'),
        new latloninfo('CG',-0.228021,15.827659,'Congo [Republic]'),
        new latloninfo('CH',46.818188,8.227512,'Switzerland'),
        new latloninfo('CK',-21.236736,-159.777671,'Cook Islands'),
        new latloninfo('CL',-35.675147,-71.542969,'Chile'),
        new latloninfo('CM',7.369722,12.354722,'Cameroon'),
        new latloninfo('CN',35.86166,104.195397,'China'),
        new latloninfo('CO',4.570868,-74.297333,'Colombia'),
        new latloninfo('CR',9.748917,-83.753428,'Costa Rica'),
        new latloninfo('CU',21.521757,-77.781167,'Cuba'),
        new latloninfo('CV',16.002082,-24.013197,'Cape Verde'),
        new latloninfo('CX',-10.447525,105.690449,'Christmas Island'),
        new latloninfo('CY',35.126413,33.429859,'Cyprus'),
        new latloninfo('CZ',49.817492,15.472962,'Czech Republic'),
        new latloninfo('DE',51.165691,10.451526,'Germany'),
        new latloninfo('DJ',11.825138,42.590275,'Djibouti'),
        new latloninfo('DK',56.26392,9.501785,'Denmark'),
        new latloninfo('DM',15.414999,-61.370976,'Dominica'),
        new latloninfo('DO',18.735693,-70.162651,'Dominican Republic'),
        new latloninfo('DZ',28.033886,1.659626,'Algeria'),
        new latloninfo('EC',-1.831239,-78.183406,'Ecuador'),
        new latloninfo('EE',58.595272,25.013607,'Estonia'),
        new latloninfo('EG',26.820553,30.802498,'Egypt'),
        new latloninfo('EH',24.215527,-12.885834,'Western Sahara'),
        new latloninfo('ER',15.179384,39.782334,'Eritrea'),
        new latloninfo('ES',40.463667,-3.74922,'Spain'),
        new latloninfo('ET',9.145,40.489673,'Ethiopia'),
        new latloninfo('FI',61.92411,25.748151,'Finland'),
        new latloninfo('FJ',-16.578193,179.414413,'Fiji'),
        new latloninfo('FK',-51.796253,-59.523613,'Falkland Islands [Islas Malvinas]'),
        new latloninfo('FM',7.425554,150.550812,'Micronesia'),
        new latloninfo('FO',61.892635,-6.911806,'Faroe Islands'),
        new latloninfo('FR',46.227638,2.213749,'France'),
        new latloninfo('GA',-0.803689,11.609444,'Gabon'),
        new latloninfo('GB',55.378051,-3.435973,'UK'),
        new latloninfo('GD',12.262776,-61.604171,'Grenada'),
        new latloninfo('GE',42.315407,43.356892,'Georgia'),
        new latloninfo('GF',3.933889,-53.125782,'French Guiana'),
        new latloninfo('GG',49.465691,-2.585278,'Guernsey'),
        new latloninfo('GH',7.946527,-1.023194,'Ghana'),
        new latloninfo('GI',36.137741,-5.345374,'Gibraltar'),
        new latloninfo('GL',71.706936,-42.604303,'Greenland'),
        new latloninfo('GM',13.443182,-15.310139,'Gambia'),
        new latloninfo('GN',9.945587,-9.696645,'Guinea'),
        new latloninfo('GP',16.995971,-62.067641,'Guadeloupe'),
        new latloninfo('GQ',1.650801,10.267895,'Equatorial Guinea'),
        new latloninfo('GR',39.074208,21.824312,'Greece'),
        new latloninfo('GS',-54.429579,-36.587909,'South Georgia and the South Sandwich Islands'),
        new latloninfo('GT',15.783471,-90.230759,'Guatemala'),
        new latloninfo('GU',13.444304,144.793731,'Guam'),
        new latloninfo('GW',11.803749,-15.180413,'Guinea-Bissau'),
        new latloninfo('GY',4.860416,-58.93018,'Guyana'),
        new latloninfo('GZ',31.354676,34.308825,'Gaza Strip'),
        new latloninfo('HK',22.396428,114.109497,'Hong Kong'),
        new latloninfo('HM',-53.08181,73.504158,'Heard Island and McDonald Islands'),
        new latloninfo('HN',15.199999,-86.241905,'Honduras'),
        new latloninfo('HR',45.1,15.2,'Croatia'),
        new latloninfo('HT',18.971187,-72.285215,'Haiti'),
        new latloninfo('HU',47.162494,19.503304,'Hungary'),
        new latloninfo('ID',-0.789275,113.921327,'Indonesia'),
        new latloninfo('IE',53.41291,-8.24389,'Ireland'),
        new latloninfo('IL',31.046051,34.851612,'Israel'),
        new latloninfo('IM',54.236107,-4.548056,'Isle of Man'),
        new latloninfo('IN',20.593684,78.96288,'India'),
        new latloninfo('IO',-6.343194,71.876519,'British Indian Ocean Territory'),
        new latloninfo('IQ',33.223191,43.679291,'Iraq'),
        new latloninfo('IR',32.427908,53.688046,'Iran'),
        new latloninfo('IS',64.963051,-19.020835,'Iceland'),
        new latloninfo('IT',41.87194,12.56738,'Italy'),
        new latloninfo('JE',49.214439,-2.13125,'Jersey'),
        new latloninfo('JM',18.109581,-77.297508,'Jamaica'),
        new latloninfo('JO',30.585164,36.238414,'Jordan'),
        new latloninfo('JP',36.204824,138.252924,'Japan'),
        new latloninfo('KE',-0.023559,37.906193,'Kenya'),
        new latloninfo('KG',41.20438,74.766098,'Kyrgyzstan'),
        new latloninfo('KH',12.565679,104.990963,'Cambodia'),
        new latloninfo('KI',-3.370417,-168.734039,'Kiribati'),
        new latloninfo('KM',-11.875001,43.872219,'Comoros'),
        new latloninfo('KN',17.357822,-62.782998,'Saint Kitts and Nevis'),
        new latloninfo('KP',40.339852,127.510093,'North Korea'),
        new latloninfo('KR',35.907757,127.766922,'S. Korea'),
        new latloninfo('KW',29.31166,47.481766,'Kuwait'),
        new latloninfo('KY',19.513469,-80.566956,'Cayman Islands'),
        new latloninfo('KZ',48.019573,66.923684,'Kazakhstan'),
        new latloninfo('LA',19.85627,102.495496,'Laos'),
        new latloninfo('LB',33.854721,35.862285,'Lebanon'),
        new latloninfo('LC',13.909444,-60.978893,'Saint Lucia'),
        new latloninfo('LI',47.166,9.555373,'Liechtenstein'),
        new latloninfo('LK',7.873054,80.771797,'Sri Lanka'),
        new latloninfo('LR',6.428055,-9.429499,'Liberia'),
        new latloninfo('LS',-29.609988,28.233608,'Lesotho'),
        new latloninfo('LT',55.169438,23.881275,'Lithuania'),
        new latloninfo('LU',49.815273,6.129583,'Luxembourg'),
        new latloninfo('LV',56.879635,24.603189,'Latvia'),
        new latloninfo('LY',26.3351,17.228331,'Libya'),
        new latloninfo('MA',31.791702,-7.09262,'Morocco'),
        new latloninfo('MC',43.750298,7.412841,'Monaco'),
        new latloninfo('MD',47.411631,28.369885,'Moldova'),
        new latloninfo('ME',42.708678,19.37439,'Montenegro'),
        new latloninfo('MG',-18.766947,46.869107,'Madagascar'),
        new latloninfo('MH',7.131474,171.184478,'Marshall Islands'),
        new latloninfo('MK',41.608635,21.745275,'Macedonia [FYROM]'),
        new latloninfo('ML',17.570692,-3.996166,'Mali'),
        new latloninfo('MM',21.913965,95.956223,'Myanmar [Burma]'),
        new latloninfo('MN',46.862496,103.846656,'Mongolia'),
        new latloninfo('MO',22.198745,113.543873,'Macau'),
        new latloninfo('MP',17.33083,145.38469,'Northern Mariana Islands'),
        new latloninfo('MQ',14.641528,-61.024174,'Martinique'),
        new latloninfo('MR',21.00789,-10.940835,'Mauritania'),
        new latloninfo('MS',16.742498,-62.187366,'Montserrat'),
        new latloninfo('MT',35.937496,14.375416,'Malta'),
        new latloninfo('MU',-20.348404,57.552152,'Mauritius'),
        new latloninfo('MV',3.202778,73.22068,'Maldives'),
        new latloninfo('MW',-13.254308,34.301525,'Malawi'),
        new latloninfo('MX',23.634501,-102.552784,'Mexico'),
        new latloninfo('MY',4.210484,101.975766,'Malaysia'),
        new latloninfo('MZ',-18.665695,35.529562,'Mozambique'),
        new latloninfo('NA',-22.95764,18.49041,'Namibia'),
        new latloninfo('NC',-20.904305,165.618042,'New Caledonia'),
        new latloninfo('NE',17.607789,8.081666,'Niger'),
        new latloninfo('NF',-29.040835,167.954712,'Norfolk Island'),
        new latloninfo('NG',9.081999,8.675277,'Nigeria'),
        new latloninfo('NI',12.865416,-85.207229,'Nicaragua'),
        new latloninfo('NL',52.132633,5.291266,'Netherlands'),
        new latloninfo('NO',60.472024,8.468946,'Norway'),
        new latloninfo('NP',28.394857,84.124008,'Nepal'),
        new latloninfo('NR',-0.522778,166.931503,'Nauru'),
        new latloninfo('NU',-19.054445,-169.867233,'Niue'),
        new latloninfo('NZ',-40.900557,174.885971,'New Zealand'),
        new latloninfo('OM',21.512583,55.923255,'Oman'),
        new latloninfo('PA',8.537981,-80.782127,'Panama'),
        new latloninfo('PE',-9.189967,-75.015152,'Peru'),
        new latloninfo('PF',-17.679742,-149.406843,'French Polynesia'),
        new latloninfo('PG',-6.314993,143.95555,'Papua New Guinea'),
        new latloninfo('PH',12.879721,121.774017,'Philippines'),
        new latloninfo('PK',30.375321,69.345116,'Pakistan'),
        new latloninfo('PL',51.919438,19.145136,'Poland'),
        new latloninfo('PM',46.941936,-56.27111,'Saint Pierre and Miquelon'),
        new latloninfo('PN',-24.703615,-127.439308,'Pitcairn Islands'),
        new latloninfo('PR',18.220833,-66.590149,'Puerto Rico'),
        new latloninfo('PS',31.952162,35.233154,'Palestinian Territories'),
        new latloninfo('PT',39.399872,-8.224454,'Portugal'),
        new latloninfo('PW',7.51498,134.58252,'Palau'),
        new latloninfo('PY',-23.442503,-58.443832,'Paraguay'),
        new latloninfo('QA',25.354826,51.183884,'Qatar'),
        new latloninfo('RE',-21.115141,55.536384,'Réunion'),
        new latloninfo('RO',45.943161,24.96676,'Romania'),
        new latloninfo('RS',44.016521,21.005859,'Serbia'),
        new latloninfo('RU',61.52401,105.318756,'Russia'),
        new latloninfo('RW',-1.940278,29.873888,'Rwanda'),
        new latloninfo('SA',23.885942,45.079162,'Saudi Arabia'),
        new latloninfo('SB',-9.64571,160.156194,'Solomon Islands'),
        new latloninfo('SC',-4.679574,55.491977,'Seychelles'),
        new latloninfo('SD',12.862807,30.217636,'Sudan'),
        new latloninfo('SE',60.128161,18.643501,'Sweden'),
        new latloninfo('SG',1.352083,103.819836,'Singapore'),
        new latloninfo('SH',-24.143474,-10.030696,'Saint Helena'),
        new latloninfo('SI',46.151241,14.995463,'Slovenia'),
        new latloninfo('SJ',77.553604,23.670272,'Svalbard and Jan Mayen'),
        new latloninfo('SK',48.669026,19.699024,'Slovakia'),
        new latloninfo('SL',8.460555,-11.779889,'Sierra Leone'),
        new latloninfo('SM',43.94236,12.457777,'San Marino'),
        new latloninfo('SN',14.497401,-14.452362,'Senegal'),
        new latloninfo('SO',5.152149,46.199616,'Somalia'),
        new latloninfo('SR',3.919305,-56.027783,'Suriname'),
        new latloninfo('ST',0.18636,6.613081,'São Tomé and Príncipe'),
        new latloninfo('SV',13.794185,-88.89653,'El Salvador'),
        new latloninfo('SY',34.802075,38.996815,'Syria'),
        new latloninfo('SZ',-26.522503,31.465866,'Swaziland'),
        new latloninfo('TC',21.694025,-71.797928,'Turks and Caicos Islands'),
        new latloninfo('TD',15.454166,18.732207,'Chad'),
        new latloninfo('TF',-49.280366,69.348557,'French Southern Territories'),
        new latloninfo('TG',8.619543,0.824782,'Togo'),
        new latloninfo('TH',15.870032,100.992541,'Thailand'),
        new latloninfo('TJ',38.861034,71.276093,'Tajikistan'),
        new latloninfo('TK',-8.967363,-171.855881,'Tokelau'),
        new latloninfo('TL',-8.874217,125.727539,'Timor-Leste'),
        new latloninfo('TM',38.969719,59.556278,'Turkmenistan'),
        new latloninfo('TN',33.886917,9.537499,'Tunisia'),
        new latloninfo('TO',-21.178986,-175.198242,'Tonga'),
        new latloninfo('TR',38.963745,35.243322,'Turkey'),
        new latloninfo('TT',10.691803,-61.222503,'Trinidad and Tobago'),
        new latloninfo('TV',-7.109535,177.64933,'Tuvalu'),
        new latloninfo('TW',23.69781,120.960515,'Taiwan'),
        new latloninfo('TZ',-6.369028,34.888822,'Tanzania'),
        new latloninfo('UA',48.379433,31.16558,'Ukraine'),
        new latloninfo('UG',1.373333,32.290275,'Uganda'),
        
        new latloninfo('US',37.09024,-95.712891,'USA'),
        new latloninfo('UY',-32.522779,-55.765835,'Uruguay'),
        new latloninfo('UZ',41.377491,64.585262,'Uzbekistan'),
        new latloninfo('VA',41.902916,12.453389,'Vatican City'),
        new latloninfo('VC',12.984305,-61.287228,'Saint Vincent and the Grenadines'),
        new latloninfo('VE',6.42375,-66.58973,'Venezuela'),
        new latloninfo('VG',18.420695,-64.639968,'British Virgin Islands'),
        new latloninfo('VI',18.335765,-64.896335,'U.S. Virgin Islands'),
        new latloninfo('VN',14.058324,108.277199,'Vietnam'),
        new latloninfo('VU',-15.376706,166.959158,'Vanuatu'),
        new latloninfo('WF',-13.768752,-177.156097,'Wallis and Futuna'),
        new latloninfo('WS',-13.759029,-172.104629,'Samoa'),
        new latloninfo('XK',42.602636,20.902977,'Kosovo'),
        new latloninfo('YE',15.552727,48.516388,'Yemen'),
        new latloninfo('YT',-12.8275,45.166244,'Mayotte'),
        new latloninfo('ZA',-30.559482,22.937506,'South Africa'),
        new latloninfo('ZM',-13.133897,27.849332,'Zambia'),
        new latloninfo('ZW',-19.015438,29.154857,'Zimbabwe'),
        

    ]

}