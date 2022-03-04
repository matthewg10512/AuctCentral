import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCategorySiteComponent } from './auction-category-site.component';

describe('AuctionCategorySiteComponent', () => {
  let component: AuctionCategorySiteComponent;
  let fixture: ComponentFixture<AuctionCategorySiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionCategorySiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCategorySiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
