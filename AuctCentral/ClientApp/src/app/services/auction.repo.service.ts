import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuctionItem } from '../interfaces/auctionitem';
import { AuctionItemsResourceParameters } from '../resource-parameters/auction.items.resource';
import { AuctionSite } from '../interfaces/auctionsite';
import { AuctionSearchWord } from '../interfaces/auctionSearchWord';
import { AuctionCategorySite } from '../interfaces/auctioncategorysite';
import { AuctionSiteCategoryWord } from '../interfaces/auctionsitecategoryword';
import { AuctionStatisticDetail } from '../interfaces/auctionstatisticdetail';


//import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class AuctionRepoService {


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, @Inject('BASE_URL') private baseUrl: string//,
    //  private messageService: MessageService
  ) { }


  GetAuctionStatisticDetail(auctionItemsResourceParameters: AuctionItemsResourceParameters): Observable<AuctionStatisticDetail[]> {
    let searchQuery: string = '';
    searchQuery = this.AuctionItemsResourceParametersQuery(auctionItemsResourceParameters);

    return this.http.get<AuctionStatisticDetail[]>(this.baseUrl + 'GetAuctionItemStatistics' + searchQuery);
  }


  AuctionItemsResourceParametersQuery(auctionItemsResourceParameters: AuctionItemsResourceParameters): string{

    let searchQuery: string = '';
    if (auctionItemsResourceParameters.itemPriceMin) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      searchQuery = searchQuery + "itemPriceMin=" + auctionItemsResourceParameters.itemPriceMin;
    }
    if (auctionItemsResourceParameters.itemPriceMax) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      searchQuery = searchQuery + "itemPriceMax=" + auctionItemsResourceParameters.itemPriceMax;
    }

    if (auctionItemsResourceParameters.auctionEndDateRangeMax) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      var dMax = auctionItemsResourceParameters.auctionEndDateRangeMax;
      searchQuery = searchQuery + "auctionEndDateRangeMax=" + (dMax.getMonth() + 1) + '/' + dMax.getDate() + '/' + dMax.getFullYear();
    }

    if (auctionItemsResourceParameters.auctionEndDateRangeMin) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      var d = auctionItemsResourceParameters.auctionEndDateRangeMin;
      searchQuery = searchQuery + "auctionEndDateRangeMin=" + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    }

    if (auctionItemsResourceParameters.auctionSiteId) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      searchQuery = searchQuery + "auctionSiteId=" + auctionItemsResourceParameters.auctionSiteId;
    }

    if (auctionItemsResourceParameters.auctionSearchWordId) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      searchQuery = searchQuery + "auctionSearchWordId=" + auctionItemsResourceParameters.auctionSearchWordId;
    }

    if (auctionItemsResourceParameters.productName) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      searchQuery = searchQuery + "productName=" + auctionItemsResourceParameters.productName;
    }

    if (auctionItemsResourceParameters.auctionEndProcessed) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      searchQuery = searchQuery + "auctionEndProcessed=" + 'true';
    }


    if (auctionItemsResourceParameters.totalBidsMin) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      searchQuery = searchQuery + "totalBidsMin=" + auctionItemsResourceParameters.totalBidsMin;
    }

    if (auctionItemsResourceParameters.totalBidsMax) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      searchQuery = searchQuery + "totalBidsMax=" + auctionItemsResourceParameters.totalBidsMax;
    }

    if (auctionItemsResourceParameters.auctionItemId) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      searchQuery = searchQuery + (auctionItemsResourceParameters.auctionItemId.length > 1 ?
        "auctionItemId=" + auctionItemsResourceParameters.auctionItemId.join("&auctionItemId=") :
        "auctionItemId=" + auctionItemsResourceParameters.auctionItemId[0]
          )
        ;
    }
    


    return searchQuery;

  }

  GetAuctionItems(auctionItemsResourceParameters: AuctionItemsResourceParameters): Observable<AuctionItem[]> {


    let searchQuery: string = '';


    searchQuery = this.AuctionItemsResourceParametersQuery(auctionItemsResourceParameters);

   
      return this.http.get<AuctionItem[]>(this.baseUrl + 'AuctionItem' + searchQuery);
  }



  GetAuctionSites(): Observable<AuctionSite[]> {
    return this.http.get<AuctionSite[]>(this.baseUrl + 'AuctionSite');
    
  }
  GetAuctionSiteCategoryWords(): Observable<AuctionSiteCategoryWord[]> {
    return this.http.get<AuctionSiteCategoryWord[]>(this.baseUrl + 'AuctionSiteCategoryWord');

  }




  UpsertAuctionSiteCategoryWords(auctionSiteCategoryWord: AuctionSiteCategoryWord): Observable<any> {
    const params = null; //new HttpParams().set('securityId', '' + val);
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    if (auctionSiteCategoryWord.id) {
      auctionSiteCategoryWord.id = Number(auctionSiteCategoryWord.id);
    }
    auctionSiteCategoryWord.auctionCategoryId = Number(auctionSiteCategoryWord.auctionCategoryId);
    auctionSiteCategoryWord.auctionSearchWordId = Number(auctionSiteCategoryWord.auctionSearchWordId);
    const body = JSON.stringify(auctionSiteCategoryWord);
   /* {
      'auctionCategoryId': auctionSiteCategoryWord.auctionCategoryId,
      'auctionSearchWordId': auctionSiteCategoryWord.auctionSearchWordId
    };
    */
    
    return this.http.put<any>(this.baseUrl + 'AuctionSiteCategoryWord', body, { headers, params });
  }
  


  GetAuctionCategorySites(): Observable<AuctionCategorySite[]> {
    return this.http.get<AuctionCategorySite[]>(this.baseUrl + 'AuctionCategorySite');

  }
  

  GetAuctionSearchWords(): Observable<AuctionSearchWord[]> {
    return this.http.get<AuctionSearchWord[]>(this.baseUrl + 'AuctionSearchWord');

  }

  AddNewAuctionSearchWord(newAuctionSearchWord: string): Observable<any> {
    const params = null;
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = { 'SearchWord': newAuctionSearchWord};
    return this.http.put<any>(this.baseUrl + 'AuctionSearchWord', body, { headers, params });
  }


  UpdateAuctionSearchWord(auctionSearchWord: AuctionSearchWord): Observable<any> {
    const params = null;
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = JSON.stringify(auctionSearchWord);
    return this.http.put<any>(this.baseUrl + 'AuctionSearchWord', body, { headers, params });
  }

  
  

  DeleteAuctionSiteCategoryWord(auctionSiteCategoryWordId: number): Observable<any> {
    const params = new HttpParams().set('auctionSiteCategoryWordId', auctionSiteCategoryWordId + '');

    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

    return this.http.delete(this.baseUrl + 'AuctionSiteCategoryWord/' + auctionSiteCategoryWordId, { headers, params })
      .pipe(
        tap(_ => this.log(`deleted Auction Site Category Word`)),
        catchError(this.handleError<any>('DeleteAuctionSiteCategoryWord'))
      );
  }

  DeleteAuctionSearchWord(auctionSearchWordId: number): Observable<any> {
    const params = new HttpParams().set('auctionSearchWordId', auctionSearchWordId + '');
    
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

    return this.http.delete(this.baseUrl + 'AuctionSearchWord/' + auctionSearchWordId, { headers, params })
      .pipe(
        tap(_ => this.log(`deleted AuctionSearchWord`)),
        catchError(this.handleError<any>('DeleteAuctionSearchWord'))
      );
  }
  

    /*
  auctionEndDateRangeMin: Date;
  auctionEndDateRangeMax: Date;
  itemPriceMin: number;
  itemPriceMax: number;
  totalBidsMin: number;
  totalBidsMax: number;
  productName: string;
*/
 

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
    console.log('matt was here');
  }


}
