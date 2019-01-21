import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WordService {
  
  constructor(private http:HttpClient) { }

    // service to fetch data
    public getWord(word: string)
    {
      const headers = new HttpHeaders()
      .append('Accept','application/json')
      .append('app_id','1ca03b94')
      .append('app_key','acc165b16d64d90b4e1274393d79a5f2');
      return this.http.get(`/api/search/en?q=${word}&prefix=false&limit=10`, {
        headers
      });
  }

    // service to fetch full data
    public getDefinition(word:string)
    {
      const headers = new HttpHeaders()
      .append('Accept','application/json')
      .append('app_id','1ca03b94')
      .append('app_key','acc165b16d64d90b4e1274393d79a5f2');
      return this.http.get(`/api/entries/en/${word}`, {
        headers
    });
  }
    // service to get synonyms and antonyms
    public SynAnt(word: string)
    {
      const headers = new HttpHeaders()
      .append('Accept','application/json')
      .append('app_id','1ca03b94')
      .append('app_key','acc165b16d64d90b4e1274393d79a5f2');
      return this.http.get(`/api/entries/en/${word}/synonyms;antonyms`, {
        headers
      });
    }    

    private handleError(err: HttpErrorResponse) {

      let errorMessage = '';
  
      if (err.error instanceof Error) {
  
        errorMessage = `An error occurred: ${err.error.message}`;
  
      } else {
  
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  
      } // end condition *if
  
      console.error(errorMessage);
  
      return Observable.throw(errorMessage);
  
    }  // END handleError  

  }