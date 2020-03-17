export class countrydata{

    Country : string;
    Province : string;
    Lat : number;
    Lon : number;
    Date : Date;
    Cases : number;
    Status: string;

    tc : number;
    tr : number;
    td : number;

    ta : number;
   


    
    constructor(country, province, lat, lon, date,cases,status,){

        this.Country = country;
        this.Province = province;
        this.Lat = lat;
        this.Date = date;
        this.Lon = lon;
        this.Cases = cases;
        this.Status = status;
       

    }
}