import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CountryNumbersService } from 'src/app/Services/CountryNumbersService';
import { coronalmaodata } from 'src/app/shared/models/coronalmaodata';

@Component({
  selector: 'app-country-filter',
  templateUrl: './country-filter.component.html',
  styleUrls: ['./country-filter.component.css']
})
export class CountryFilterComponent implements OnInit {

  @Input() countryDropdownValues : string[] = [];
  @Output() countryTotalDataChanged = new EventEmitter<number[]>();
  @Input()countriesData: coronalmaodata[] = [];
   constructor(private service : CountryNumbersService) { }

  ngOnInit() {
  }

  filerData(selectedCountry: string) {

    if (selectedCountry !== "0") {

      this.service.getLatLongBasedOnCountry(selectedCountry);

      const data = this.countriesData.filter(s => s.country === selectedCountry)
     this.countryTotalDataChanged.emit([+data[0].cases, +data[0].deaths, +data[0].recovered, data[0].cases - (data[0].deaths + data[0].recovered)]);
    }
    // else {

    //   this.TotalNumbersArray = [this.TotalConfirmedT, this.TotalDeathsT, this.TotalRecoveredT, this.TotalConfirmedT - (this.TotalDeathsT + this.TotalRecoveredT)]

    // }
  }

}
