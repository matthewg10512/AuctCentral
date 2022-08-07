import { Component, OnInit, ViewChild } from '@angular/core';
import { AuctionRepoService } from '../services/auction.repo.service';
import { AuctionSearchWord } from '../interfaces/auctionSearchWord';

@Component({
  selector: 'app-auction-search-words',
  templateUrl: './auction-search-words.component.html',
  styleUrls: ['./auction-search-words.component.css']
})
export class AuctionSearchWordsComponent implements OnInit {

  deleteSearchWordId: number;
  searchSearchWord: string;
  newAuctionSearchWord: string;
  masterAuctionSearchWords: AuctionSearchWord[];
  auctionSearchWords: AuctionSearchWord[];

  editSearchWord: boolean[];

  @ViewChild('myModalClose', { static: false }) modalClose;
  constructor(private auctionRepoService: AuctionRepoService) { }

  ngOnInit() {
    this.searchSearchWord = '';
    this.newAuctionSearchWord = '';
    this.GetSearchWordsRecords();
  }

  GetSearchWordsRecords(): void {
    this.auctionRepoService.GetSearchWords().subscribe(auctionSearchWords => {
      this.masterAuctionSearchWords = auctionSearchWords;
      this.onKeypressEvent();
    });

  }
  DeleteAuctionSearchWord(): void {

    this.auctionRepoService.DeleteAuctionSearchWord(this.deleteSearchWordId).subscribe(auctionSearchResult => {
      this.modalClose.nativeElement.click();
      this.GetSearchWordsRecords();
      this.deleteSearchWordId = 0;
    });
  }
  AddNewAuctionSearchWord(): void {

    if (this.newAuctionSearchWord == '') {
      alert("Empty");
    }
    else {
      this.auctionRepoService.AddNewAuctionSearchWord(this.newAuctionSearchWord).subscribe(auctionSearchResult => {
        this.newAuctionSearchWord = '';
        this.GetSearchWordsRecords();;
      });
    }
  }
  ConfirmDeleteAuctionSearchWord(auctionSearchWordId: number): void {

    
    this.deleteSearchWordId = auctionSearchWordId;
  }


  SaveAuctionSearchWord(index: number): void {
    this.auctionRepoService.UpdateAuctionSearchWord(this.auctionSearchWords[index]).subscribe(auctionSearchResult => {
      this.GetSearchWordsRecords();;
    });
  }

  /*
   *Cancel the update to the Auction Search Word Edit 
   */ 
  CancelAuctionSearchWordSave(index: number): void {
    this.editSearchWord[index] = false;
    this.GetSearchWordsRecords();
  }
  /*
   * Launch the Edit Mechanism 
   */ 
  EditAuctionSearchWord(index: number): void {
    this.editSearchWord[index] = true;
  }

  onKeypressEvent(): void {

    if (this.searchSearchWord == '') {
      this.auctionSearchWords = this.masterAuctionSearchWords.filter(x => x);
      this.editSearchWord = [];
      for (var i = 0; i < this.auctionSearchWords.length; i++) {
        this.editSearchWord.push(false);
      }
      
    } else {
      this.auctionSearchWords = this.masterAuctionSearchWords.filter(element => element.word.toLowerCase().includes(this.searchSearchWord.toLowerCase()));
      this.editSearchWord = [];
      for (var i = 0; i < this.auctionSearchWords.length; i++) {
        this.editSearchWord.push(false);
      }
    }
    
    
  }

}
