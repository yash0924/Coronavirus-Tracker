import { Component, OnInit } from '@angular/core';
import { CountryNumbersService } from '../Services/CountryNumbersService';
import { news } from '../shared/models/news';

@Component({
  selector: 'app-importantnews',
  templateUrl: './importantnews.component.html',
  styleUrls: ['./importantnews.component.css']
})
export class ImportantnewsComponent implements OnInit {

  constructor(private service :  CountryNumbersService) { }

  newsData : news[] = [];
  ngOnInit( ) {

    this.service.getLatestNews().subscribe(data => {

      this.newsData = data['articles'];

      console.log(this.newsData);

      });;
  }

}
