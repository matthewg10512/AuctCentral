import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionStatisticsResultsComponent } from './auction-statistics-results.component';

describe('AuctionStatisticsResultsComponent', () => {
  let component: AuctionStatisticsResultsComponent;
  let fixture: ComponentFixture<AuctionStatisticsResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionStatisticsResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionStatisticsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
