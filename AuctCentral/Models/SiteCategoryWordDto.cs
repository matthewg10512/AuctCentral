using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctCentral.Models
{
    public class SiteCategoryWordDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int SearchWordId { get; set; }
    }
}
