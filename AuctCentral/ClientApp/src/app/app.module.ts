import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatDatepickerModule } from '@angular/material/datepicker';


import { MatNativeDateModule } from '@angular/material/core';
import { AuctionSearchWordsComponent } from './auction-search-words/auction-search-words.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuctionCategorySiteComponent } from './auction-category-site/auction-category-site.component';

import { MatTableModule } from '@angular/material/table'  

import { MatPaginatorModule } from '@angular/material';
import { LoadingDataComponent } from './widget/loading-data/loading-data.component';

import { DatePipe } from '@angular/common';
import { AuctionStatisticsComponent } from './auction-statistics/auction-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AuctionSearchWordsComponent,
    AuctionCategorySiteComponent,
    LoadingDataComponent,
    AuctionStatisticsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
    
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'searchwords', component: AuctionSearchWordsComponent },
      { path: 'categorysites', component: AuctionCategorySiteComponent },
      { path: 'statistics', component: AuctionStatisticsComponent },
    ])
  ],
  providers: [
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
