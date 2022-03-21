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
        public async Task<IEnumerable<AuctionStatisticDetailDto>> GetAuctionItemStatistics([FromQuery] AuctionItemsResourceParameters auctionItemsResourceParameters)
        {

            List<AuctionStatisticDetailDto> info = new List<AuctionStatisticDetailDto>();
            _authentication.AuthenticationToken(_configuration);
            string searchQuery = GetAuctionItemsResourcesQuery(auctionItemsResourceParameters);

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
                        info = JsonConvert.DeserializeObject<List<AuctionStatisticDetailDto>>(responseString);
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
        public async Task<IEnumerable<AuctionItemDto>> GetAuctionItems([FromQuery] AuctionItemsResourceParameters auctionItemsResourceParameters)
        {
            List<AuctionItemDto> info = new List<AuctionItemDto>();



            _authentication.AuthenticationToken(_configuration);

            string searchQuery = GetAuctionItemsResourcesQuery(auctionItemsResourceParameters);
           
            


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
                        info = JsonConvert.DeserializeObject<List<AuctionItemDto>>(responseString);
                        Console.WriteLine(responseString);
                    }
                    catch (Exception ex)
                    {

                    }
                    
                }
            }


            return info;
        }




        private string GetAuctionItemsResourcesQuery(AuctionItemsResourceParameters auctionItemsResourceParameters)
        {
            string searchQuery = "";
            if (auctionItemsResourceParameters.ItemPriceMax.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "ItemPriceMax=" + auctionItemsResourceParameters.ItemPriceMax;
            }
            if (auctionItemsResourceParameters.ItemPriceMin.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "ItemPriceMin=" + auctionItemsResourceParameters.ItemPriceMin;
            }
            if (auctionItemsResourceParameters.AuctionSiteId.HasValue && auctionItemsResourceParameters.AuctionSiteId.Value != 0)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "AuctionSiteId=" + auctionItemsResourceParameters.AuctionSiteId;
            }

            if (auctionItemsResourceParameters.AuctionSearchWordId.HasValue && auctionItemsResourceParameters.AuctionSearchWordId.Value != 0)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "AuctionSearchWordId=" + auctionItemsResourceParameters.AuctionSearchWordId;
            }

            if (auctionItemsResourceParameters.AuctionEndDateRangeMax.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "AuctionEndDateRangeMax=" + auctionItemsResourceParameters.AuctionEndDateRangeMax.Value.ToString("MM/dd/yyyy");
            }
            if (auctionItemsResourceParameters.AuctionEndDateRangeMin.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "AuctionEndDateRangeMin=" + auctionItemsResourceParameters.AuctionEndDateRangeMin.Value.ToString("MM/dd/yyyy");
            }
            if (auctionItemsResourceParameters.ProductName != null && auctionItemsResourceParameters.ProductName != "")
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "ProductName=" + auctionItemsResourceParameters.ProductName;
            }



            if (auctionItemsResourceParameters.TotalBidsMax.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "TotalBidsMax=" + auctionItemsResourceParameters.TotalBidsMax;
            }

            if (auctionItemsResourceParameters.TotalBidsMin.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "TotalBidsMin=" + auctionItemsResourceParameters.TotalBidsMin;
            }

            if (auctionItemsResourceParameters.AuctionEndProcessed.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "auctionEndProcessed=" + auctionItemsResourceParameters.AuctionEndProcessed.ToString();

            }

            if (auctionItemsResourceParameters.AuctionItemId != null && auctionItemsResourceParameters.AuctionItemId.Length > 0)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += auctionItemsResourceParameters.AuctionItemId.Length > 1 ?
                    "AuctionItemId=" + string.Join("&AuctionItemId=",auctionItemsResourceParameters.AuctionItemId)
                    :
                     "AuctionItemId=" + auctionItemsResourceParameters.AuctionItemId[0]
                    ;

            }


            

            return searchQuery;
        }





    }
}
