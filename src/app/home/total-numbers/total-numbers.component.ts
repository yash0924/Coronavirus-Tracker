import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-total-numbers',
  templateUrl: './total-numbers.component.html',
  styleUrls: ['./total-numbers.component.css']
})
export class TotalNumbersComponent implements OnInit {

  @Input() totalNumbers : number[] = [];
  
  constructor() { }

  ngOnInit() {
  }

}
