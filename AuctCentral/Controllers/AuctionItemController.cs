using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AuctCentral.Models;
using AuctCentral.ResourceParameters;
using AuctCentral.Services.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace AuctCentral.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuctionItemController : ControllerBase
    {
        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public AuctionItemController(IConfiguration configuration, IAuthentication authentication)
        {

            _configuration = configuration;
            _authentication = authentication;
        }


        [HttpGet]
        [Route("~/GetAuctionItemStatistics")]
        public async Task<IEnumerable<StatisticDetailDto>> GetAuctionItemStatistics([FromQuery] ItemsResourceParameters itemsResourceParameters)
        {

            List<StatisticDetailDto> info = new List<StatisticDetailDto>();
            _authentication.AuthenticationToken(_configuration);
            string searchQuery = GetAuctionItemsResourcesQuery(itemsResourceParameters);

            using (var client = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "GetAuctionItemStatistics" + searchQuery;

                client.DefaultRequestHeaders
                   .Accept
                        .Add(new MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header
                _authentication.SetBearerToken(client, _configuration);
                var response = client.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    try
                    {
                        var responseContent = response.Content;

                        string responseString = responseContent.ReadAsStringAsync().Result;
                        info = JsonConvert.DeserializeObject<List<StatisticDetailDto>>(responseString);
                        Console.WriteLine(responseString);
                    }
                    catch (Exception ex)
                    {

                    }

                }
            }


            return info;

        }
        
        [HttpGet]
        public async Task<IEnumerable<ItemDto>> GetAuctionItems([FromQuery] ItemsResourceParameters itemsResourceParameters)
        {
            List<ItemDto> info = new List<ItemDto>();



            _authentication.AuthenticationToken(_configuration);

            string searchQuery = GetAuctionItemsResourcesQuery(itemsResourceParameters);
           
            


            using (var client = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "AuctionItems" + searchQuery;



                client.DefaultRequestHeaders
                   .Accept
                        .Add(new MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header
                _authentication.SetBearerToken(client, _configuration);
                var response = client.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {


                    try
                    {
                        // by calling .Result you are performing a synchronous call
                     
                        var responseContent = response.Content;

                    // by calling .Result you are synchronously reading the result
                    



                        string responseString = responseContent.ReadAsStringAsync().Result;
                        info = JsonConvert.DeserializeObject<List<ItemDto>>(responseString);
                        Console.WriteLine(responseString);
                    }
                    catch (Exception ex)
                    {

                    }
                    
                }
            }


            return info;
        }




        private string GetAuctionItemsResourcesQuery(ItemsResourceParameters itemsResourceParameters)
        {
            string searchQuery = "";
            if (itemsResourceParameters.ItemPriceMax.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "ItemPriceMax=" + itemsResourceParameters.ItemPriceMax;
            }
            if (itemsResourceParameters.ItemPriceMin.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "ItemPriceMin=" + itemsResourceParameters.ItemPriceMin;
            }
            if (itemsResourceParameters.SiteId.HasValue && itemsResourceParameters.SiteId.Value != 0)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "SiteId=" + itemsResourceParameters.SiteId;
            }

            if (itemsResourceParameters.SearchWordId.HasValue && itemsResourceParameters.SearchWordId.Value != 0)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "SearchWordId=" + itemsResourceParameters.SearchWordId;
            }

            if (itemsResourceParameters.AuctionEndDateRangeMax.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "AuctionEndDateRangeMax=" + itemsResourceParameters.AuctionEndDateRangeMax.Value.ToString("MM/dd/yyyy");
            }
            if (itemsResourceParameters.AuctionEndDateRangeMin.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "AuctionEndDateRangeMin=" + itemsResourceParameters.AuctionEndDateRangeMin.Value.ToString("MM/dd/yyyy");
            }
            if (itemsResourceParameters.ProductName != null && itemsResourceParameters.ProductName != "")
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "ProductName=" + itemsResourceParameters.ProductName;
            }



            if (itemsResourceParameters.TotalBidsMax.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "TotalBidsMax=" + itemsResourceParameters.TotalBidsMax;
            }

            if (itemsResourceParameters.TotalBidsMin.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "TotalBidsMin=" + itemsResourceParameters.TotalBidsMin;
            }

            if (itemsResourceParameters.AuctionEndProcessed.HasValue && itemsResourceParameters.AuctionEndProcessed.Value)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "auctionEndProcessed=" + itemsResourceParameters.AuctionEndProcessed.ToString();

            }

            if (itemsResourceParameters.ItemId != null && itemsResourceParameters.ItemId.Length > 0)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += itemsResourceParameters.ItemId.Length > 1 ?
                    "ItemId=" + string.Join("&ItemId=",itemsResourceParameters.ItemId)
                    :
                     "ItemId=" + itemsResourceParameters.ItemId[0]
                    ;

            }


            

            return searchQuery;
        }





    }
}
