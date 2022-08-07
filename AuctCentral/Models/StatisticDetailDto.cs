using AuctCentral.ResourceParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctCentral.Models
{
    public class StatisticDetailDto
    {

        public int SearchWordId { get; set; }
        public List<string> AuctionKeyWords { get; set; }

        public ItemStatDetail ItemStatDetail { get; set; }

        public ItemsResourceParameters ItemsResourceParameters { get; set; }

        public List<int> ItemId { get; set; }
    }
}
