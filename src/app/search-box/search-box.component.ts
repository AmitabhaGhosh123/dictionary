import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { WordService } from '../word.service';
import { ToastrService } from 'ngx-toastr';
import { filter , switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  public searchField : FormControl = new FormControl();
  public wordList:any;
  public displayList = false;
  public link;

  constructor(private router:Router, private http:WordService, private toastr:ToastrService) { }

  ngOnInit() {
    this.searchField.valueChanges
    .pipe(
      filter(value => !value || value.length > 2 || value !== ''),
      filter(value => value !== ''),
      switchMap( query => query.length > 2 ? this.http.getWord(query) : this.wordList = ' ')
    )
      // handling observable
    .subscribe(
      data => {
        this.wordList = ' ';
        this.displayList = true;
        this.wordList = data;
      },
      // handling http error codes
      error => {
        console.log(error);
        if(error.status === 404 || error.status === 414){
          this.toastr.error('Try again with valid word');
        }
        else if(error.status === 403){
          this.toastr.error(`Invalid credentials`,`Please enter correct details`);
        }
        else if(error.status === 414){
          this.toastr.error(`Your word is too long`,`Please reduce the length of the word`);
        }
        else if(error.status === 500){
          this.toastr.warning(`Something is broken`,`Please contact developer`);
        }
        else if(error.status === 502){
          this.toastr.info(`Oxford Dictionaries API is down or being upgraded`,`Bad Gateway`);
        }
        else if(error.status === 503){
          this.toastr.info(`Please try again later`, `Service Unavailable`);
        }
        else if(error.status === 504){
          this.toastr.info(`Please try again later`, `Gateway timeout`);
        }
      }      
    );

  }
      // declared focus function for search box value
    public onFocus(value)
    {
      if(value.length > 0)
      {
        this.displayList = true;
      }
      else
      {
        this.displayList = false;
      }
    }

    // declared onListClick function for clicking word in list
    public onListClick(e)
    {
      this.link = this.router.url.split('/');

    if (this.link.indexOf('definition') > -1) {

      this.displayList = false;

    }

    e.stopPropagation();

    this.router.navigate([e.target.children['0'].pathname]);

    }

    //declared button click function
    public btnClick(value)
    {
      const letters = /^[A-Za-z ]*$/;
      const regexp = value.match(letters);
      if(regexp === null || value === '')
      {
        alert('Please enter a word');
      }
      else
      {
        this.router.navigate(['/definition',value]);
      }
    }
  }
