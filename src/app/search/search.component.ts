import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordService } from '../word.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public wordList: any;
  constructor(private route:ActivatedRoute, private router:Router, private http:WordService) { }

  ngOnInit() {
  }

}
