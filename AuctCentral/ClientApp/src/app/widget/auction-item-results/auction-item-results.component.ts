import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuctionItemsResourceParameters } from '../../resource-parameters/auction.items.resource';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AuctionItem } from '../../interfaces/auctionitem';
import { AuctionRepoService } from '../../services/auction.repo.service';
import { AuctionSite } from '../../interfaces/auctionsite';
import { AuctionSearchWord } from '../../interfaces/auctionSearchWord';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-auction-item-results',
  templateUrl: './auction-item-results.component.html',
  styleUrls: ['./auction-item-results.component.css']
})
export class AuctionItemResultsComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() auctionItemsResourceParameters: AuctionItemsResourceParameters;
  @Input() events: Observable<void>;


  auctionItems: AuctionItem[];
  sortNameDesc: boolean = false;
  sortPriceDesc: boolean = false;
  auctionItemsSource = new MatTableDataSource<AuctionItem>(this.auctionItems);
  searchRunning: boolean = false;

  auctionSites: AuctionSite[];
  searchWords: AuctionSearchWord[];

  displayedColumns: string[] = ['image', 'productname', 'ends', 'site', 'searchname', 'totalbids', 'price'];//, 'ends', 'site', 'searchname'];
  constructor(private auctionRepoService: AuctionRepoService) { }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(() => this.SearchAuctionItems());
    this.GetAuctionSites();
    this.GetSearchWordsRecords();
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  ngAfterViewInit() {
    this.auctionItemsSource.paginator = this.paginator;
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


  SearchAuctionItems(): void {
    this.searchRunning = true;
    this.auctionItemsSource = new MatTableDataSource<AuctionItem>(this.auctionItems);
    this.auctionRepoService.GetAuctionItems(this.auctionItemsResourceParameters).subscribe(auctionItems => {
      this.searchRunning = false;

      this.auctionItemsSource = new MatTableDataSource<AuctionItem>(auctionItems);
      this.auctionItemsSource.paginator = this.paginator;




    });

  }

  GetSearchWord(searchWordId: number): string {
    let word: string = '';
    let index = this.searchWords.findIndex(x => x.id === searchWordId);
    if (index > -1) {
      word = this.searchWords[index].word;
    }
    return word;
  }

  GetAuctionSiteName(siteId: number): string {
    let siteName: string = '';
    let index = this.auctionSites.findIndex(x => x.id === siteId);
    if (index > -1) {
      siteName = this.auctionSites[index].siteName;
    }
    return siteName;
  }


  GetSearchWordsRecords(): void {
    this.auctionRepoService.GetSearchWords().subscribe(searchWords => {
      this.searchWords = [];
      let auctionSearchWordAll: AuctionSearchWord = new AuctionSearchWord();
      auctionSearchWordAll.id = 0;
      this.searchWords.push(auctionSearchWordAll);

      var auctionSiteLength = searchWords.length;
      for (var i = 0; i < auctionSiteLength; i++) {
        this.searchWords.push(searchWords[i]);
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
}
