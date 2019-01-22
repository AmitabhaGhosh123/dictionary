# PersonalDictionaryApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

Domain URL : https://cooldictionary.ml


Important note: Due to oxford api limitations of blocking requests from external servers, this application will not run on the cloud server. But this will work in the local repository. 

Problem Statement

Project Description -

The aim of the project is to create a dictionary application using Angular. You will be using Oxford dictionary’s open API as your backend and the frontend application that is to be created by you must have all the features mentioned later. Application UI should be designed by yourself using Bootstrap. You are not allowed to use bootstrap template available on internet. The code should be entirely yours. Before we jump into the feature list, let's look at our API and how to use it.

About the API -

Oxford Dictionaries API is an open source dictionary API which gives you access to all the data that is used by oxford dictionary website. Here is how you can use the API - Step 1 - Go to https://developer.oxforddictionaries.com and click on Get your API Key. Step 2 - Select the Free plan which gives you access to 3k requests per month. We think that many requests should be sufficient for your overall project development, however if you discover that you need more, just create another free account using a different email id. Do not select a paid pricing plan! Step 3 - Once you have signed up. Get your APP key and ID Step 4 - Check out this guide on how to make request to this API Step 5 - Follow this API Documentation to select the suitable API for your application feature

Features of the Application -

Search page - The home page of the application should be a search page with option to search a particular word in the dictionary. The search box should show suggestions only after first 3 characters have been typed in the search box. The search box should also show autocomplete suggestions while typing the words in the search box. Take example from the search box on the home page of oxford dictionary . You have to create a custom component of your own for this ( do not use an external NPM module or library for this) . There should be a search button to enable user to search the word. On clicking search or on clicking the word on the autocomplete list, a full page view of that word should open

Full page view of the word - On clicking the word in autocomplete list or pressing search button in previous view, a full page view of the word should open. It should display all the information about that word. Take example from this word page of oxford dictionary where the word “something” has been searched. As displayed on the page, your view should display all meanings, use of the word in phrases etc. It should also display the synonyms and antonyms of the words(if any). Select the relevant API from the API documentation yourself.
Error Views - Check out the HTTP response codes for this API. You have to handle each error response with a different page.

Project Description :

The front end of the application is built with angular and it is hosted in the AWS EC2 Instance. mdbootstrap is used for page creating layouts.

The application has 2 main views.

Home view
Definition view
The home view is the app shell. The search input is a separate component as it is used in both the views.

The Application uses 3 different API endpoints to get data. One for getting the search suggestions as user types and others are to retrieve the full data of a word and synonyms, antonyms respectively.

The search input component uses rxjs operators switchMap, filter to prevent unnecessary API requests to the server.

Listen for data from an input.

Trim the value (remove whitespace) and make sure it’s a minimum length (3).

The ngx-toaster external library is used to enhance the user experience. The toaster is used to notify the user about the successful and unsuccessful API requests.

As the user types in the search box, the suggestions are displayed after clicking any of those suggestions the definition view is opened which contains origin, synonyms & antonyms (If available) and meaning with examples.

 The API does not currently support CORS requests due to the potential implications for the security of their server the application uses the proxy server to get the response from the API. Check out here (https://forum.oxforddictionaries.com/api/discussion/18/error-message-no-access-control-allow-origin-or-i-can-t-get-my-client-side-request-to-work).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
