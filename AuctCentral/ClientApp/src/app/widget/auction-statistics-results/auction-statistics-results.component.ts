import { Component, OnInit, ViewChild } from '@angular/core';
import { AuctionItemsResourceParameters } from '../../resource-parameters/auction.items.resource';
import { AuctionRepoService } from '../../services/auction.repo.service';
import { AuctionStatisticDetail } from '../../interfaces/auctionstatisticdetail';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AuctionSearchWord } from '../../interfaces/auctionSearchWord';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-auction-statistics-results',
  templateUrl: './auction-statistics-results.component.html',
  styleUrls: ['./auction-statistics-results.component.css']
})
export class AuctionStatisticsResultsComponent implements OnInit {

  constructor(private auctionRepoService: AuctionRepoService) { }
  topLevelSearch: false;
  auctionItemsResourceParameters: AuctionItemsResourceParameters;
  auctionStatDetails: AuctionStatisticDetail[];
  masterAuctionStatDetails: AuctionStatisticDetail[];
  searchingSiteAuctions: boolean;

  auctionItemsSource = new MatTableDataSource<AuctionStatisticDetail>(this.auctionStatDetails);

  displayedColumns: string[] = ['searchname', 'auctionkeywords', 'count', 'average', 'min', 'max'];//, 'ends', 'site', 'searchname'];
  searchSearchWord: string;

  auctionSearchWords: AuctionSearchWord[];



  eventsSubject: Subject<void> = new Subject<void>();


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  ngAfterViewInit() {
    this.auctionItemsSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.searchSearchWord = '';
    this.searchingSiteAuctions = true;
    this.GetSearchWordsRecords();
    this.auctionItemsResourceParameters = new AuctionItemsResourceParameters();
  }

  GetAuctionStatisticDetail(): void {
    let auctionItemRP: AuctionItemsResourceParameters = new AuctionItemsResourceParameters();
    auctionItemRP.totalBidsMin = 1;
    this.auctionRepoService.GetAuctionStatisticDetail(auctionItemRP).subscribe(auctionStatDetails => {
      this.searchingSiteAuctions = false;
      this.masterAuctionStatDetails = auctionStatDetails;
      this.FilterResults();
    });
  }

  onKeypressEvent(): void {
    this.topLevelSearch = false;
    this.FilterResults();
  }

  FilterResults(): void {
    if (this.topLevelSearch) {
      this.auctionStatDetails = this.masterAuctionStatDetails.filter(x => x.auctionKeyWords.length == 0);
    }
    else if (this.searchSearchWord == '') {
      this.auctionStatDetails = this.masterAuctionStatDetails.filter(x => x);
    } else {
      this.auctionStatDetails = this.masterAuctionStatDetails.filter(x => x);
      var searchWords = this.searchSearchWord.split(' ');
      for (const searchWord of searchWords) {
        // ...use `element`...
        this.auctionStatDetails = this.auctionStatDetails.filter(element => element.auctionKeyWords.join(',,').includes(searchWord.toLowerCase()));
      }
    }
    this.auctionItemsSource = new MatTableDataSource<AuctionStatisticDetail>(this.auctionStatDetails);
    this.auctionItemsSource.paginator = this.paginator;
  }

  GetItemResults(auctionStatisticDetail: AuctionStatisticDetail): void {
    this.auctionItemsResourceParameters.itemId = auctionStatisticDetail.itemId;
    this.eventsSubject.next();
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

      this.GetAuctionStatisticDetail();

    });

  }





  GetSearchWord(searchWordId: number): string {
    let searchWord: string = '';
    let index = this.auctionSearchWords.findIndex(x => x.id === searchWordId);
    if (index > -1) {
      searchWord = this.auctionSearchWords[index].word;
    }
    return searchWord;
  }


}
