using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AuctCentral.Models;
using AuctCentral.Services.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RestSharp;

namespace AuctCentral.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuctionSearchWordController : ControllerBase
    {
        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public AuctionSearchWordController(IConfiguration configuration, IAuthentication authentication)
        {

            _configuration = configuration;
            _authentication = authentication;
        }


        [HttpGet]
        public async Task<IEnumerable<AuctionSearchWordDto>> GetAuctionSearchWords()
        {
            List<AuctionSearchWordDto> info = new List<AuctionSearchWordDto>();

            _authentication.AuthenticationToken(_configuration);
            using (var client = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "AuctionSearchWords";



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
                        info = JsonConvert.DeserializeObject<List<AuctionSearchWordDto>>(responseString);

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
        public async Task<IActionResult> UpsertAuctionSearchWord(AuctionSearchWordDto auctionSearchWord)
        {
            _authentication.AuthenticationToken(_configuration);
            string apiUrl = _configuration.GetValue<string>("APIURL");

            var url = apiUrl + "AuctionSearchWords";
            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.PUT);
            request.AddHeader("Accept", "application/json");
            _authentication.SetBearerTokenRest(request, _configuration);
            request.AddHeader("Content-Type", "application/json");
           
            request.AddParameter("application/json; charset=utf-8", JsonConvert.SerializeObject(auctionSearchWord), ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);


            return NoContent();
        }

        [HttpDelete("{auctionSearchWordId}", Name = "DeleteInvestmentProjection")]
        public async Task<IActionResult> DeleteAuctionSearchWord(int auctionSearchWordId)
        {
            _authentication.AuthenticationToken(_configuration);

            string apiUrl = _configuration.GetValue<string>("APIURL");
            var url = apiUrl + "AuctionSearchWords/" + auctionSearchWordId.ToString();


            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.DELETE);
            request.AddHeader("Accept", "application/json");

            request.AddHeader("Content-Type", "application/json");
            _authentication.SetBearerTokenRest(request, _configuration);
            request.AddParameter("application/json", "{\"auctionSearchWordId\":" + auctionSearchWordId.ToString() + "}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);

            return Ok();

            
        }




        }
}
