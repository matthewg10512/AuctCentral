import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionItemResultsComponent } from './auction-item-results.component';

describe('AuctionItemResultsComponent', () => {
  let component: AuctionItemResultsComponent;
  let fixture: ComponentFixture<AuctionItemResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionItemResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionItemResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
