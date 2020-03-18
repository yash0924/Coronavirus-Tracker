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
   


    
    constructor(country, date,cases : number, tr : number, td : number, ta : number){

        this.Country = country;
      
      
        this.Date = date;
      
        this.Cases = cases;
        this.Status = status;
        this.tc = cases;
        this.tr = tr;
        this.td = td;
    
        this.ta = ta;
       

    }
}