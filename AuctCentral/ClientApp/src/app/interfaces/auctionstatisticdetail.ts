import { AuctionItemsResourceParameters } from "../resource-parameters/auction.items.resource";
import { ItemStatDetail } from "./itemstatdetail";

export class AuctionStatisticDetail {
  auctionSearchWordId: number;
  auctionKeyWords: string[];
  itemStatDetail: ItemStatDetail
  auctionItemsResourceParameters: AuctionItemsResourceParameters;
  auctionItemIds: number[];
}
