import { Component, ViewChild } from '@angular/core';
import { AuctionRepoService } from '../services/auction.repo.service';
import { AuctionItem } from '../interfaces/auctionitem';
import { AuctionItemsResourceParameters } from '../resource-parameters/auction.items.resource';
import { AuctionSite } from '../interfaces/auctionsite';
import { AuctionSearchWord } from '../interfaces/auctionSearchWord';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  constructor(private auctionRepoService: AuctionRepoService) { }

  
  //displayedColumns: string[] = ['productname', 'ends', 'site', 'searchname'];
  

  
  auctionItemsResourceParameters: AuctionItemsResourceParameters;
  auctionItems: AuctionItem[];
  
  auctionSites: AuctionSite[];
  auctionSearchWords: AuctionSearchWord[];


  eventsSubject: Subject<void> = new Subject<void>();

  SearchAuctionItems() {
    this.eventsSubject.next();
  }

  auctionItemsSource = new MatTableDataSource<AuctionItem>(this.auctionItems);

  ngOnInit() {
    this.auctionItemsResourceParameters = new AuctionItemsResourceParameters();
    this.auctionItemsResourceParameters.siteId =0;
    this.auctionItemsResourceParameters.auctionEndDateRangeMin = new Date();
    this.GetAuctionSites();
    this.GetSearchWordsRecords();
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  ngAfterViewInit() {
    this.auctionItemsSource.paginator = this.paginator;
  }





  


 

  GetSearchWordsRecords(): void {
    this.auctionRepoService.GetSearchWords().subscribe(auctionSearchWords => {
      this.auctionSearchWords = [];
      let auctionSearchWordAll: AuctionSearchWord = new AuctionSearchWord();
      auctionSearchWordAll.id = 0;
      this.auctionSearchWords.push(auctionSearchWordAll);

      var auctionSiteLength = auctionSearchWords.length;
      for (var i = 0; i < auctionSiteLength; i++) {
        this.auctionSearchWords.push(auctionSearchWords[i]);
        // this.investProjectionStockFactoryList.push(...investProjections);
      }

    });

  }
  GetAuctionSites(): void {
    this.auctionRepoService.GetAuctionSites().subscribe(auctionSites => {
      this.auctionSites = []; 
      let auctionSiteAll: AuctionSite = new AuctionSite();
      auctionSiteAll.id = 0;
      this.auctionSites.push(auctionSiteAll);

      var auctionSiteLength = auctionSites.length;
      for (var i = 0; i < auctionSiteLength; i++) {
        this.auctionSites.push(auctionSites[i]);
        // this.investProjectionStockFactoryList.push(...investProjections);
      }
      
    });

  }
  /*
  GetAuctionDate(auctionEndDate: Date): string{
    var date = new Date(auctionEndDate);
    if (date.getFullYear() > 2022) {
      return 'Buy it Now'
    } else {

      var d = date,
        dformat = [d.getMonth() + 1,
        d.getDate(),
        d.getFullYear()].join('/') + ' ' +
          [d.getHours(),
          d.getMinutes(),
          d.getSeconds()].join(':');
      return dformat;
    }
    
    
  }
  */




}
