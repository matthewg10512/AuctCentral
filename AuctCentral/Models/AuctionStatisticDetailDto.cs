using AuctCentral.ResourceParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctCentral.Models
{
    public class AuctionStatisticDetailDto
    {

        public int AuctionSearchWordId { get; set; }
        public List<string> AuctionKeyWords { get; set; }

        public ItemStatDetail ItemStatDetail { get; set; }

        public AuctionItemsResourceParameters AuctionItemsResourceParameters { get; set; }

        public List<int> AuctionItemIds { get; set; }
    }
}
