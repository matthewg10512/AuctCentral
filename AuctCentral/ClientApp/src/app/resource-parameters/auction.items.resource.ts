export class AuctionItemsResourceParameters {


  auctionEndDateRangeMin: Date;
  auctionEndDateRangeMax: Date;
  itemPriceMin: number; 
  itemPriceMax: number;
  totalBidsMin: number;
  totalBidsMax: number;
  productName: string;
  siteId: number;
  searchWordId: number;
  auctionEndProcessed: boolean;
  itemId: number[];
}
