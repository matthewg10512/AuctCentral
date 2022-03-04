import { Component } from '@angular/core';
import { AuctionRepoService } from '../services/auction.repo.service';
import { AuctionItem } from '../interfaces/auctionitem';
import { AuctionItemsResourceParameters } from '../resource-parameters/auction.items.resource';
import { AuctionSite } from '../interfaces/auctionsite';
import { AuctionSearchWord } from '../interfaces/auctionSearchWord';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private auctionRepoService: AuctionRepoService) { }

  auctionItemsResourceParameters: AuctionItemsResourceParameters;
  auctionItems: AuctionItem[]; 
  auctionSites: AuctionSite[];
  auctionSearchWords: AuctionSearchWord[];

  sortNameDesc: boolean = false;
  sortPriceDesc: boolean = false;

  ngOnInit() {
    this.auctionItemsResourceParameters = new AuctionItemsResourceParameters();
    this.auctionItemsResourceParameters.auctionSiteId =0;

    this.GetAuctionSites();
    this.GetAuctionSearchWordsRecords();
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
      this.auctionItems.sort((a, b) => a.productName.localeCompare(b.productName));

    } else {
      this.auctionItems.sort((a, b) => b.productName.localeCompare(a.productName));
    }
    this.sortNameDesc = !this.sortNameDesc;
  }

  sortByPrice(): void {
    if (this.sortPriceDesc) {
      this.auctionItems.sort((a, b) => a.itemPrice - b.itemPrice);

    } else {
      this.auctionItems.sort((a, b) => b.itemPrice - a.itemPrice);
    }
    this.sortPriceDesc = !this.sortPriceDesc;
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
    this.auctionRepoService.GetAuctionItems(this.auctionItemsResourceParameters).subscribe(auctionItems => {
      if (auctionItems && auctionItems.length > 500) {
        alert('Please refine your search to less than 500.  There are currently ' + auctionItems.length + ' records');
      } else {
        this.auctionItems = auctionItems;

      }

    });

  }


}
