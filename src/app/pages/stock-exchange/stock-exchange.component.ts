import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

import { StockExchangeService } from '../..//services/stock-exchange.service';
import { IPriceTime } from '../../shared/models/interfaces/price-time-interface';
import { CustomSelectComponent } from '../../shared/components/custom-select/custom-select.component';
import { INTERVAL_TIME } from '../../shared/models/constants/interval-tume-constant';
import { ICustomSelect } from '../../shared/models/interfaces/custom-select-interface';
import { IMinMaxPrice } from '../../shared/models/interfaces/max-min-price-interface';

@Component({
  selector: 'app-stock-exchange',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CustomSelectComponent],
  templateUrl: './stock-exchange.component.html',
  styleUrls: ['./stock-exchange.component.scss']
})
export class StockExchangeComponent implements OnInit {
  readonly INTERVAL_TIME: ICustomSelect[] = INTERVAL_TIME;
  priceTimeData = signal<IPriceTime[]>([]);
  minMaxPrice = signal<IMinMaxPrice[]>([]);
  stockExchangeForm!: FormGroup;
  private interval = signal<number>(0);
  private destroyRef = inject(DestroyRef);

  constructor(
    private stockExchangeService: StockExchangeService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getNewPrice();
    this.initializeStockExchangeForm();
  }

  /**
   * send chosen interval
   */
  sendInterval(): void {
    this.stockExchangeService.getMaxMinPrice(this.interval());
    this.minMaxPrice.set(this.stockExchangeService.minMaxPrice());
  }

  /**
   * get new price
   */
  private getNewPrice(): void {
    this.priceTimeData.set(this.stockExchangeService.priceTimeData());
  }

  /**
   * initialize reactive form for stock exchange
   */
  private initializeStockExchangeForm(): void {
    this.stockExchangeForm = this.formBuilder.group({
      interval: ['', Validators.required]
    })
    this.itervalChange();
  }

  /**
   * when value has been chenged
   */
  private itervalChange(): void {
    this.stockExchangeForm.valueChanges
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(300)
    )
    .subscribe((value) => {
      this.interval.set(value.interval);
    })
  }
}
