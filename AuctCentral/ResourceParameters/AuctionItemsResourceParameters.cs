using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctCentral.ResourceParameters
{
    public class ItemsResourceParameters
    {
        public DateTime? AuctionEndDateRangeMin { get; set; }
        public DateTime? AuctionEndDateRangeMax { get; set; }

        public decimal? ItemPriceMin { get; set; }
        public decimal? ItemPriceMax { get; set; }
        public int? TotalBidsMin { get; set; }
        public int? TotalBidsMax { get; set; }

        public string ProductName { get; set; }

        public int? SiteId { get; set; }
        public int? SearchWordId { get; set; }

        public bool? AuctionEndProcessed { get; set; }
        public int[] ItemId { get; set; }

    }
}
