using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctCentral.Models
{
    public class AuctionSiteCategoryWordDto
    {
        public int Id { get; set; }
        public int AuctionCategoryId { get; set; }
        public int AuctionSearchWordId { get; set; }
    }
}
