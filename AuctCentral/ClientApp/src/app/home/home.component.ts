import { Component, ViewChild } from '@angular/core';
import { AuctionRepoService } from '../services/auction.repo.service';
import { AuctionItem } from '../interfaces/auctionitem';
import { AuctionItemsResourceParameters } from '../resource-parameters/auction.items.resource';
import { AuctionSite } from '../interfaces/auctionsite';
import { AuctionSearchWord } from '../interfaces/auctionSearchWord';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  constructor(private auctionRepoService: AuctionRepoService) { }

  
  //displayedColumns: string[] = ['productname', 'ends', 'site', 'searchname'];
  displayedColumns: string[] = ['image','productname','ends','site','searchname','totalbids','price'];//, 'ends', 'site', 'searchname'];

  
  auctionItemsResourceParameters: AuctionItemsResourceParameters;
  auctionItems: AuctionItem[];
  
  auctionSites: AuctionSite[];
  auctionSearchWords: AuctionSearchWord[];


  searchRunning: boolean = false;

  sortNameDesc: boolean = false;
  sortPriceDesc: boolean = false;

  auctionItemsSource = new MatTableDataSource<AuctionItem>(this.auctionItems);

  ngOnInit() {
    this.auctionItemsResourceParameters = new AuctionItemsResourceParameters();
    this.auctionItemsResourceParameters.auctionSiteId =0;
    this.auctionItemsResourceParameters.auctionEndDateRangeMin = new Date();
    this.GetAuctionSites();
    this.GetAuctionSearchWordsRecords();
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  ngAfterViewInit() {
    this.auctionItemsSource.paginator = this.paginator;
  }
  GetAuctionSearchWord(auctionSearchWordId: number): string {
    let searchWord: string = '';
    let index = this.auctionSearchWords.findIndex(x => x.id === auctionSearchWordId);
    if (index > -1) {
      searchWord = this.auctionSearchWords[index].searchWord;
    }
    return searchWord;
  }

  sortByName(): void {
    if (this.sortNameDesc) {
      this.auctionItemsSource.data.sort((a, b) => a.productName.localeCompare(b.productName));

    } else {
      this.auctionItemsSource.data.sort((a, b) => b.productName.localeCompare(a.productName));
    }
    this.auctionItemsSource.paginator = this.paginator;
    
    this.sortNameDesc = !this.sortNameDesc;
  }

  sortByPrice(): void {

    if (this.sortPriceDesc) {
      this.auctionItemsSource.data.sort((a, b) => a.itemPrice - b.itemPrice);

    } else {
      this.auctionItemsSource.data.sort((a, b) => b.itemPrice - a.itemPrice);
    }
   
    this.sortPriceDesc = !this.sortPriceDesc;
    this.auctionItemsSource.paginator = this.paginator;
  }


  


  GetAuctionSiteName(auctionSiteId: number): string {
    let siteName: string = '';
    let index = this.auctionSites.findIndex(x => x.id === auctionSiteId);
    if (index > -1) {
      siteName = this.auctionSites[index].siteName;
    }
    return siteName;
  }

  GetAuctionSearchWordsRecords(): void {
    this.auctionRepoService.GetAuctionSearchWords().subscribe(auctionSearchWords => {
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


  SearchAuctionItems(): void{
    this.searchRunning = true;
    this.auctionItemsSource = new MatTableDataSource<AuctionItem>(this.auctionItems);
    this.auctionRepoService.GetAuctionItems(this.auctionItemsResourceParameters).subscribe(auctionItems => {
      this.searchRunning = false;
      
      this.auctionItemsSource = new MatTableDataSource<AuctionItem>(auctionItems);
      this.auctionItemsSource.paginator = this.paginator;


      
    
    });

  }


}
