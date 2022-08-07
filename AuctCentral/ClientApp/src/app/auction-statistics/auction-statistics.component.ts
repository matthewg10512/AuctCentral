import { Component, OnInit, ViewChild } from '@angular/core';
import { AuctionRepoService } from '../services/auction.repo.service';
import { AuctionItemsResourceParameters } from '../resource-parameters/auction.items.resource';
import { AuctionStatisticDetail } from '../interfaces/auctionstatisticdetail';
import { AuctionSearchWord } from '../interfaces/auctionSearchWord';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-auction-statistics',
  templateUrl: './auction-statistics.component.html',
  styleUrls: ['./auction-statistics.component.css']
})
export class AuctionStatisticsComponent implements OnInit {

  constructor(private auctionRepoService: AuctionRepoService) { }
  
  


  
  
  ngOnInit() {
    
    
    
    

    

  }

  

  

}
