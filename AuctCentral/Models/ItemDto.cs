﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctCentral.Models
{
    public class ItemDto
    {

        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Url { get; set; }
        public int TotalBids { get; set; }
        public DateTime? AuctionEndDate { get; set; }
        public decimal ItemPrice { get; set; }
        public int SiteId { get; set; }
        public int SearchWordId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string ImageUrl { get; set; }

        public bool? AuctionEndProcessed { get; set; }
    }
}
