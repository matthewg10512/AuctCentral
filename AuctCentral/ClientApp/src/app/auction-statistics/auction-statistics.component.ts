import { Component, OnInit, ViewChild } from '@angular/core';
import { AuctionRepoService } from '../services/auction.repo.service';
import { AuctionItemsResourceParameters } from '../resource-parameters/auction.items.resource';
import { AuctionStatisticDetail } from '../interfaces/auctionstatisticdetail';
import { AuctionSearchWord } from '../interfaces/auctionSearchWord';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-auction-statistics',
  templateUrl: './auction-statistics.component.html',
  styleUrls: ['./auction-statistics.component.css']
})
export class AuctionStatisticsComponent implements OnInit {

  constructor(private auctionRepoService: AuctionRepoService) { }
  displayedColumns: string[] = ['searchname', 'auctionkeywords', 'count', 'average', 'min', 'max'];//, 'ends', 'site', 'searchname'];
  searchAuctionSearchWord: string;
  topLevelSearch: false;
  auctionSearchWords: AuctionSearchWord[];
  auctionStatDetails: AuctionStatisticDetail[];
  masterAuctionStatDetails: AuctionStatisticDetail[];

  auctionItemsSource = new MatTableDataSource<AuctionStatisticDetail>(this.auctionStatDetails);


  searchingSiteAuctions: boolean;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  ngAfterViewInit() {
    this.auctionItemsSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.searchAuctionSearchWord = '';
    this.searchingSiteAuctions = true;

    this.GetAuctionSearchWordsRecords();

    

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

      this.GetAuctionStatisticDetail();

    });

  }

  onKeypressEvent(): void {

    this.topLevelSearch = false;

    this.FilterResults();

    

  }

  FilterResults(): void{


    if (this.topLevelSearch) {
      this.auctionStatDetails = this.masterAuctionStatDetails.filter(x => x.auctionKeyWords.length ==0);
    }

    else if (this.searchAuctionSearchWord == '') {
      this.auctionStatDetails = this.masterAuctionStatDetails.filter(x => x);


    } else {
      this.auctionStatDetails = this.masterAuctionStatDetails.filter(x => x);

      var searchWords = this.searchAuctionSearchWord.split(' ');

      for (const searchWord of searchWords) {
        // ...use `element`...
        this.auctionStatDetails = this.auctionStatDetails.filter(element => element.auctionKeyWords.join(',,').includes(searchWord.toLowerCase()));
      }



    }

    this.auctionItemsSource = new MatTableDataSource<AuctionStatisticDetail>(this.auctionStatDetails);
    this.auctionItemsSource.paginator = this.paginator;


  }

  GetAuctionStatisticDetail(): void{
    let auctionItemRP: AuctionItemsResourceParameters = new AuctionItemsResourceParameters();
    auctionItemRP.totalBidsMin = 1;

    this.auctionRepoService.GetAuctionStatisticDetail(auctionItemRP).subscribe(auctionStatDetails => {
      this.searchingSiteAuctions = false;
      this.masterAuctionStatDetails = auctionStatDetails;
      
      this.FilterResults();
      

    });
  }

  GetAuctionSearchWord(auctionSearchWordId: number): string {
    let searchWord: string = '';
    let index = this.auctionSearchWords.findIndex(x => x.id === auctionSearchWordId);
    if (index > -1) {
      searchWord = this.auctionSearchWords[index].searchWord;
    }
    return searchWord;
  }

}
