import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionStatisticsComponent } from './auction-statistics.component';

describe('AuctionStatisticsComponent', () => {
  let component: AuctionStatisticsComponent;
  let fixture: ComponentFixture<AuctionStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
