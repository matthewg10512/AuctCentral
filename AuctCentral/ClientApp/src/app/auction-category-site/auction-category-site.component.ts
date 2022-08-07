import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('myModalClose', { static: false }) modalClose;
  @ViewChild('deleteMyModalClose', { static: false }) deleteModalClose;


  deleteauctionSiteCategoryWordId: number = 0;
  searchCategorySite: string;

  auctionCategorySite: number = 0;
  auctionSearchWords: AuctionSearchWord[];
  auctionSearchWordsOptions: AuctionSearchWord[];

  auctionSiteCategoryWordNew: AuctionSiteCategoryWord;
  auctionSiteCategoryWords: AuctionSiteCategoryWord[];


  auctionSites: AuctionSite[];
  auctionSitesOptions: AuctionSite[];

  auctionCategorySites: AuctionCategorySite[];
  masterAuctionCategorySites: AuctionCategorySite[];


  auctionCategorySitesOptions: AuctionCategorySite[];
  auctionCategorySitesOptionsFilter: AuctionCategorySite[];


  constructor(private auctionRepoService: AuctionRepoService) { }

  ngOnInit() {
    this.auctionSiteCategoryWordNew = new AuctionSiteCategoryWord();
    this.GetAuctionSites();
    this.searchCategorySite = '';
  }

  onKeypressEvent(): void {

    if (this.searchCategorySite == '') {
      this.auctionCategorySites = this.masterAuctionCategorySites.filter(x => x);
     

    } else {
//      this.auctionCategorySites = this.masterAuctionCategorySites.filter(element => element.siteCategoryName.indexOf(this.searchCategorySite) > -1);
      this.auctionCategorySites = this.masterAuctionCategorySites.filter(element => element.siteCategoryName.toLowerCase().includes(this.searchCategorySite.toLowerCase()));    
    }


  }

  GetAuctionSites(): void {
    this.auctionRepoService.GetAuctionSites().subscribe(auctionSites => {
      this.auctionSites = auctionSites;

      this.auctionSitesOptions = [];
      let auctionSiteAll: AuctionSite = new AuctionSite();
      auctionSiteAll.id = 0;
      auctionSiteAll.siteName = '';
      this.auctionSites.push(auctionSiteAll);

      var auctionSiteLength = auctionSites.length;
      for (var i = 0; i < auctionSiteLength; i++) {
        this.auctionSitesOptions.push(auctionSites[i]);
        // this.investProjectionStockFactoryList.push(...investProjections);
      }

      this.auctionSitesOptions.sort((a, b) => a.siteName.localeCompare(b.siteName));

      this.GetAuctionCategorySite();
    });

  }

 
  ConfirmDeleteSiteCategoryWord(value: number): void {
    this.deleteauctionSiteCategoryWordId = value;


  }

  DeleteAuctionSiteCategoryWord (): void {
    this.auctionRepoService.DeleteAuctionSiteCategoryWord(this.deleteauctionSiteCategoryWordId).subscribe(auctionSiteCategoryWords => {
      this.deleteModalClose.nativeElement.click();
      this.deleteauctionSiteCategoryWordId = 0;
      this.GetAuctionSiteCategoryWords();

    });
  }

  SiteOptionChanged(value: string): void {
    this.auctionSiteCategoryWordNew.categoryId = 0;
    this.auctionCategorySitesOptionsFilter = this.auctionCategorySitesOptions.filter(element => element.siteId == this.auctionCategorySite);
    this.auctionCategorySitesOptionsFilter.sort((a, b) => a.siteCategoryName.localeCompare(b.siteCategoryName));
  }

  GetAuctionSiteName(siteId: number): string {
    let siteName: string = '';
    let index = this.auctionSites.findIndex(x => x.id === siteId);
    if (index > -1) {
      siteName = this.auctionSites[index].siteName;
    }
    return siteName;
  }

  GetAuctionCategorySite(): void {
    this.auctionRepoService.GetAuctionCategorySites().subscribe(auctionCategorySites => {



      this.masterAuctionCategorySites = auctionCategorySites;
      this.onKeypressEvent();


      this.auctionCategorySitesOptions = [];

      let auctionCategorySite: AuctionCategorySite = new AuctionCategorySite();
      auctionCategorySite.id = 0;
      this.auctionCategorySitesOptions.push(auctionCategorySite);

      var auctionCategorySiteLength = auctionCategorySites.length;
      for (var i = 0; i < auctionCategorySiteLength; i++) {
        this.auctionCategorySitesOptions.push(auctionCategorySites[i]);
        // this.investProjectionStockFactoryList.push(...investProjections);
      }

      this.SiteOptionChanged('');


      this.GetSearchWordsRecords();
    });

   
  }

  AddNewAuctionCategorySearchWord(): void {
    this.auctionRepoService.UpsertAuctionSiteCategoryWords(this.auctionSiteCategoryWordNew).subscribe(auctionSiteCategoryWords => {
      this.modalClose.nativeElement.click();
      this.auctionSiteCategoryWordNew = new AuctionSiteCategoryWord();
      this.GetAuctionSiteCategoryWords();

    });

  }

  GetSiteNameFromCategory(siteCategoryId: number): string {
    let categoryId: number = 0;
    let index = this.auctionSiteCategoryWords.findIndex(x => x.categoryId === siteCategoryId);
    if (index > -1) {
      categoryId = this.auctionSiteCategoryWords[index].categoryId;
    }

    let siteId: number = 0;
    index = this.masterAuctionCategorySites.findIndex(x => x.id === categoryId);
    if (index > -1) {
      siteId = this.masterAuctionCategorySites[index].siteId;
    }

    let siteName: string = '';
    index = this.auctionSites.findIndex(x => x.id === siteId);
    if (index > -1) {
      siteName = this.auctionSites[index].siteName;
    }


    return siteName;
  }

  GetSearchWords(searchWordId: number): string {
    let word: string = '';
    let index = this.auctionSearchWords.findIndex(x => x.id === searchWordId);
    if (index > -1) {
      word = this.auctionSearchWords[index].word;
    }
    return word;
  }

  GetCategoryName(siteCategoryId:number): string {
    let siteCategoryName: string = '';
    let index = this.masterAuctionCategorySites.findIndex(x => x.id === siteCategoryId);
    if (index > -1) {
      siteCategoryName = this.masterAuctionCategorySites[index].siteCategoryName;
    }
    return siteCategoryName;
  }

  GetSearchWordsRecords(): void {
    this.auctionRepoService.GetSearchWords().subscribe(auctionSearchWords => {
      this.auctionSearchWords = auctionSearchWords;



      this.auctionSearchWordsOptions = [];

      let auctionSearchWordNew: AuctionSearchWord = new AuctionSearchWord();
      auctionSearchWordNew.id = 0;
      auctionSearchWordNew.word = '';
      this.auctionSearchWordsOptions.push(auctionSearchWordNew);

      var auctionCategorySiteLength = auctionSearchWords.length;
      for (var i = 0; i < auctionCategorySiteLength; i++) {
        this.auctionSearchWordsOptions.push(auctionSearchWords[i]);
        // this.investProjectionStockFactoryList.push(...investProjections);
      }
      

      this.auctionSearchWordsOptions.sort((a, b) => a.word.localeCompare(b.word));


      this.GetAuctionSiteCategoryWords();
    });

  }

  GetAuctionSiteCategoryWords(): void {
    this.auctionRepoService.GetAuctionSiteCategoryWords().subscribe(auctionSiteCategoryWords => {
      this.auctionSiteCategoryWords = auctionSiteCategoryWords;

    });


  }
}
