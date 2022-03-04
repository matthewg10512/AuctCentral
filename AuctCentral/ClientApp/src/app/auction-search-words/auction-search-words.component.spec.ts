import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionSearchWordsComponent } from './auction-search-words.component';

describe('AuctionSearchWordsComponent', () => {
  let component: AuctionSearchWordsComponent;
  let fixture: ComponentFixture<AuctionSearchWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionSearchWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionSearchWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
