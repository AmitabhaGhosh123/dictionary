import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { WordService } from '../word.service';
import { unionBy, uniq, sortBy } from 'lodash-es';


@Component({
  selector: 'app-full-view',
  templateUrl: './full-view.component.html',
  styleUrls: ['./full-view.component.css']
})
export class FullViewComponent implements OnInit {
  public fulldata;
  public antonyms = [];
  public synonyms = [];
  public resultObject;
  public lexicalEntries = [];
  public varientforms = [];
  public wordOrigin;
  public currentWord;
  public residueData = [];
  public notes = [];
  public show = false;

  constructor(private router:Router,private route:ActivatedRoute,private http:WordService,private toastr:ToastrService) {}

  ngOnInit() {

    // Getting the parameter from URL
    this.route.params.subscribe(routeParams => {
      this.currentWord = routeParams.id;
      this.http.getDefinition(routeParams.id).subscribe(
        data => {
          this.fulldata = data;
          this.updateData(this.fulldata);
        },
        error => {

          this.handleError(error);
        }
      );
    });
  }

  public updateData(data) {
    this.resultObject = data.results['0'];
    this.lexicalEntries = this.resultObject['lexicalEntries'];
    // removing residue data from full data
    this.residueData = this.lexicalEntries.filter(
      lexicalEntry => lexicalEntry.lexicalCategory !== 'Residual'
    );

    // making arrays empty for new data
    this.varientforms = [];
    this.antonyms = [];
    this.synonyms = [];
    this.wordOrigin = '';
    this.notes = [];
    this.extractData(this.residueData);
  }

  play(audio)
  {
    audio.play(); // play audio on clicking speak icon
  }

  public extractData(data) {
    for(let singleData of data){
      console.log(singleData); // printing the word

      // extracting word origin data

      if(singleData.entries['0'].etymologies){
        this.wordOrigin = singleData.entries['0'].etymologies;
      }

      // extracting varient forms data

      if(singleData.entries['0'].hasOwnProperty('varientforms')){
        this.varientforms.push(singleData.entries['0'].varientforms['0'].text);
      }

      // extracting notes

      if(singleData.entries['0'].hasOwnProperty('notes')){
        const temp = [];
        for(const note of singleData.entries['0'].notes){
          temp.push(note);
        }

        const not = unionBy(temp, 'text');
        this.notes = not;
      }

    }

    this.getSyn();
    this.toastr.success(`Definition of ${this.resultObject['word']} is Loaded`);
  }

  // function to get the synonyms
  public getSyn() {

    this.http.SynAnt(this.currentWord).subscribe(
      data => {
        let values = data;
        this.separateData(values);
      },
      error => {
        this.handleError(error);
      }
    );
  }

  // separate synonym and antonym into separate arrays
  public separateData(values) {

    const synonyms = [];
    const antonyms = [];
    for(const data of values.results['0'].lexicalEntries){

      for(const syn of data.entries['0'].senses){
        if(syn.synonyms){
          synonyms.push(syn.synonyms);
        }

        if(syn.antonyms){
          antonyms.push(syn.antonyms);
        }
      }
    }
    this.separateSyn(synonyms);
    this.separateAnt(antonyms);
  }

  // separating antonyms
  public separateAnt(data) {

    const temp = [];
    data.map(i => {
      i.map(j => {
        temp.push(j.text);
      });
    });

    this.antonyms = sortBy(uniq(temp));
    
  }

  // separating synonyms
  public separateSyn(data) {

    const temp = [];
    data.map(i => {
      i.map(j => {
        temp.push(j.text);
      });
    });

    this.synonyms = sortBy(uniq(temp));
  }

    // function to handle error responses
    public handleError(error)
    {
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
  }
