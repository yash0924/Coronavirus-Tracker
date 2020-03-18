import { countrydata } from './countrydata';

export class updatedServiceData{

    totalNumerC : number;
    totalNumerR : number;
    totalNumerD : number;

    totalCountriesC : countrydata;
 

    constructor(tc,tr,td,tcc){
    this.totalNumerC = tc;
    this.totalNumerR = tr;
    this.totalNumerD = td;

    this.totalCountriesC  = tcc;;
    
    }
}