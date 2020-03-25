import { Component, OnInit } from '@angular/core';
import { CountryNumbersService } from '../../Services/CountryNumbersService';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  isLoading :boolean = false;
  constructor(private service  :CountryNumbersService) {
    this.service.showHideLoader.subscribe((a) => this.isLoading = a );
   }

  ngOnInit() {
  }

}
