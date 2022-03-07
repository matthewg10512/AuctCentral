using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AuctCentral.Models;
using AuctCentral.Services.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RestSharp;

namespace AuctCentral.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuctionSiteCategoryWordController : ControllerBase
    {
        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public AuctionSiteCategoryWordController(IConfiguration configuration, IAuthentication authentication)
        {

            _configuration = configuration;
            _authentication = authentication;
        }


        [HttpGet]
        public async Task<IEnumerable<AuctionSiteCategoryWordDto>> GetAuctionSiteCategoryWords()
        {
            List<AuctionSiteCategoryWordDto> info = new List<AuctionSiteCategoryWordDto>();

            _authentication.AuthenticationToken(_configuration);
            using (var client = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "AuctionSiteCategoryWords";



                client.DefaultRequestHeaders
                   .Accept
                        .Add(new MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header
                _authentication.SetBearerToken(client, _configuration);
                var response = client.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    // by calling .Result you are performing a synchronous call
                    var responseContent = response.Content;

                    // by calling .Result you are synchronously reading the result
                    string responseString = responseContent.ReadAsStringAsync().Result;


                    try
                    {
                        info = JsonConvert.DeserializeObject<List<AuctionSiteCategoryWordDto>>(responseString);

                    }
                    catch (Exception ex)
                    {

                    }
                    Console.WriteLine(responseString);
                }
            }


            return info;
        }



        [HttpPut]
        public async Task<IActionResult> UpsertAuctionSiteCategoryWords(AuctionSiteCategoryWordDto auctionSiteCategoryWord)
        {
            _authentication.AuthenticationToken(_configuration);
            string apiUrl = _configuration.GetValue<string>("APIURL");

            var url = apiUrl + "AuctionSiteCategoryWords";
            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.PUT);
            request.AddHeader("Accept", "application/json");
            _authentication.SetBearerTokenRest(request, _configuration);
            request.AddHeader("Content-Type", "application/json");

            request.AddParameter("application/json; charset=utf-8", JsonConvert.SerializeObject(auctionSiteCategoryWord), ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);


            return NoContent();
        }

        [HttpDelete("{auctionSiteCategoryWordId}", Name = "DeleteAuctionSiteCategoryWord")]
        public async Task<IActionResult> DeleteAuctionSiteCategoryWord(int auctionSiteCategoryWordId)
        {
            _authentication.AuthenticationToken(_configuration);

            string apiUrl = _configuration.GetValue<string>("APIURL");
            var url = apiUrl + "AuctionSiteCategoryWords/" + auctionSiteCategoryWordId.ToString();


            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.DELETE);
            request.AddHeader("Accept", "application/json");

            request.AddHeader("Content-Type", "application/json");
            _authentication.SetBearerTokenRest(request, _configuration);
            request.AddParameter("application/json", "{\"auctionSearchWordId\":" + auctionSiteCategoryWordId.ToString() + "}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);

            return Ok();


        }

    }
}
