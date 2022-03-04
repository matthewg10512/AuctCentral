using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctCentral.Models
{
    public class AuctionSiteDto
    {
        public int Id { get; set; }
        public string SiteName { get; set; }
        public string SearchURL { get; set; }
        public string JsCode { get; set; }
        public string SearchWordReplace { get; set; }
        public string PageReplace { get; set; }
    }
}
