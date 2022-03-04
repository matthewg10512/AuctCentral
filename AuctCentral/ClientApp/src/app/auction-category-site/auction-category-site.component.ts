import { Component, OnInit } from '@angular/core';
import { AuctionCategorySite } from '../interfaces/auctioncategorysite';
import { AuctionRepoService } from '../services/auction.repo.service';
import { AuctionSite } from '../interfaces/auctionsite';
import { AuctionSiteCategoryWord } from '../interfaces/auctionsitecategoryword';
import { AuctionSearchWord } from '../interfaces/auctionSearchWord';

@Component({
  selector: 'app-auction-category-site',
  templateUrl: './auction-category-site.component.html',
  styleUrls: ['./auction-category-site.component.css']
})
export class AuctionCategorySiteComponent implements OnInit {

  auctionSearchWords: AuctionSearchWord[];

  auctionSiteCategoryWords: AuctionSiteCategoryWord[];
  auctionSites: AuctionSite[];
  auctionCategorySites: AuctionCategorySite[];
  constructor(private auctionRepoService: AuctionRepoService) { }

  ngOnInit() {

    this.GetAuctionSites();
  }


  GetAuctionSites(): void {
    this.auctionRepoService.GetAuctionSites().subscribe(auctionSites => {
      this.auctionSites = auctionSites;
      this.GetAuctionCategorySite();
    });

  }

  GetAuctionSiteName(auctionSiteId: number): string {
    let siteName: string = '';
    let index = this.auctionSites.findIndex(x => x.id === auctionSiteId);
    if (index > -1) {
      siteName = this.auctionSites[index].siteName;
    }
    return siteName;
  }

  GetAuctionCategorySite(): void {
    this.auctionRepoService.GetAuctionCategorySites().subscribe(auctionCategorySites => {
      this.auctionCategorySites = auctionCategorySites;
      this.GetAuctionSearchWordsRecords();
    });

   
  }


  GetSiteNameFromCategory(siteCategoryId: number): string {
    let categoryId: number = 0;
    let index = this.auctionSiteCategoryWords.findIndex(x => x.auctionCategoryId === siteCategoryId);
    if (index > -1) {
      categoryId = this.auctionSiteCategoryWords[index].auctionCategoryId;
    }

    let auctionSiteId: number = 0;
    index = this.auctionCategorySites.findIndex(x => x.id === categoryId);
    if (index > -1) {
      auctionSiteId = this.auctionCategorySites[index].auctionSiteId;
    }

    let siteName: string = '';
    index = this.auctionSites.findIndex(x => x.id === auctionSiteId);
    if (index > -1) {
      siteName = this.auctionSites[index].siteName;
    }


    return siteName;
  }

  GetAuctionSearchWords(searchWordId: number): string {
    let searchWord: string = '';
    let index = this.auctionSearchWords.findIndex(x => x.id === searchWordId);
    if (index > -1) {
      searchWord = this.auctionSearchWords[index].searchWord;
    }
    return searchWord;
  }

  GetCategoryName(siteCategoryId:number): string {
    let siteCategoryName: string = '';
    let index = this.auctionCategorySites.findIndex(x => x.id === siteCategoryId);
    if (index > -1) {
      siteCategoryName = this.auctionCategorySites[index].siteCategoryName;
    }
    return siteCategoryName;
  }

  GetAuctionSearchWordsRecords(): void {
    this.auctionRepoService.GetAuctionSearchWords().subscribe(auctionSearchWords => {
      this.auctionSearchWords = auctionSearchWords;
      this.GetAuctionSiteCategoryWords();
    });

  }

  GetAuctionSiteCategoryWords(): void {
    this.auctionRepoService.GetAuctionSiteCategoryWords().subscribe(auctionSiteCategoryWords => {
      this.auctionSiteCategoryWords = auctionSiteCategoryWords;

    });


  }
}
