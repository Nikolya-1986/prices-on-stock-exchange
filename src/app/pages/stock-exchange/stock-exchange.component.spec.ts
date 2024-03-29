import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockExchangeComponent } from './stock-exchange.component';

describe('StockExchangeComponent', () => {
  let component: StockExchangeComponent;
  let fixture: ComponentFixture<StockExchangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StockExchangeComponent]
    });
    fixture = TestBed.createComponent(StockExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
