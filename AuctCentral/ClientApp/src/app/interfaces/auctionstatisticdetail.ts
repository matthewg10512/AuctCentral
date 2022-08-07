import { AuctionItemsResourceParameters } from "../resource-parameters/auction.items.resource";
import { ItemStatDetail } from "./itemstatdetail";

export class AuctionStatisticDetail {
  searchWordId: number;
  auctionKeyWords: string[];
  itemStatDetail: ItemStatDetail
  auctionItemsResourceParameters: AuctionItemsResourceParameters;
  itemId: number[];
}
