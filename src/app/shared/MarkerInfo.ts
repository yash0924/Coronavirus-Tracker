export class MarkerInfo{

    position : string;
    title : string;
    map : any;
    Country : string;
    Province : string;
    Lat : number;
    Lon : number;
    Date : Date;
    Cases : number;
    Status: string;


    
    constructor(country, province, lat, lon, date,cases,status, postion, title, map){

        this.Country = country;
        this.Province = province;
        this.Lat = lat;
        this.Date = date;
        this.Lon = lon;
        this.Cases = cases;
        this.Status = status;
        this.position = postion;
        this.title = title;
        this.map = map;

    }
}