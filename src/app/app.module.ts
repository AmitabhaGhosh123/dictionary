import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { WordService } from './word.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullViewComponent } from './full-view/full-view.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AboutComponent,
    SearchBoxComponent,
    FullViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([{ path: 'search', component: SearchComponent },
    { path: 'about', component: AboutComponent },
    { path: 'definition/:id', component:FullViewComponent},
    { path: '', redirectTo: '/search', pathMatch: 'full' },
    { path: '**', component: SearchComponent }
  ]),
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    CommonModule

  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [WordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
