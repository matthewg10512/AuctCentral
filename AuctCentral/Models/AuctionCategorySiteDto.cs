using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctCentral.Models
{
    public class AuctionCategorySiteDto
    {
        public int Id { get; set; }
        public int AuctionSiteId { get; set; }
        public int SiteCategoryId { get; set; }
        public string SiteCategoryName { get; set; }
    }
}
