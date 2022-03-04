import { Component, OnInit, ViewChild } from '@angular/core';
import { AuctionRepoService } from '../services/auction.repo.service';
import { AuctionSearchWord } from '../interfaces/auctionSearchWord';

@Component({
  selector: 'app-auction-search-words',
  templateUrl: './auction-search-words.component.html',
  styleUrls: ['./auction-search-words.component.css']
})
export class AuctionSearchWordsComponent implements OnInit {

  deleteauctionSearchWordId: number;
  searchAuctionSearchWord: string;
  newAuctionSearchWord: string;
  masterAuctionSearchWords: AuctionSearchWord[];
  auctionSearchWords: AuctionSearchWord[];
  @ViewChild('myModalClose', { static: false }) modalClose;
  constructor(private auctionRepoService: AuctionRepoService) { }

  ngOnInit() {
    this.searchAuctionSearchWord = '';
    this.newAuctionSearchWord = '';
    this.GetAuctionSearchWordsRecords();
  }

  GetAuctionSearchWordsRecords(): void {
    this.auctionRepoService.GetAuctionSearchWords().subscribe(auctionSearchWords => {
      this.masterAuctionSearchWords = auctionSearchWords;
      this.onKeypressEvent();
    });

  }
  DeleteAuctionSearchWord(): void {

    this.auctionRepoService.DeleteAuctionSearchWord(this.deleteauctionSearchWordId).subscribe(auctionSearchResult => {
      this.modalClose.nativeElement.click();
      this.GetAuctionSearchWordsRecords();
      this.deleteauctionSearchWordId = 0;
    });
  }
  AddNewAuctionSearchWord(): void {

    if (this.newAuctionSearchWord == '') {
      alert("Empty");
    }
    else {
      this.auctionRepoService.AddNewAuctionSearchWord(this.newAuctionSearchWord).subscribe(auctionSearchResult => {
        this.newAuctionSearchWord = '';
        this.GetAuctionSearchWordsRecords();;
      });
    }
  }
  ConfirmDeleteAuctionSearchWord(auctionSearchWordId: number): void {

    
    this.deleteauctionSearchWordId = auctionSearchWordId;
  }

  onKeypressEvent(): void {

    if (this.searchAuctionSearchWord == '') {
      this.auctionSearchWords = this.masterAuctionSearchWords.filter(x=>x);
    } else {
      this.auctionSearchWords = this.masterAuctionSearchWords.filter(element => element.searchWord.indexOf(this.searchAuctionSearchWord) > -1);
    }
    
    
  }

}
