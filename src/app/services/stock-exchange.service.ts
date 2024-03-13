import { Injectable, effect, signal } from '@angular/core';

import { IPriceTime } from '../shared/models/interfaces/price-time-interface';
import { IMinMaxPrice } from '../shared/models/interfaces/max-min-price-interface';

@Injectable({
  providedIn: 'root'
})
export class StockExchangeService {

  priceTimeData = signal<IPriceTime[]>([]);
  minMaxPrice = signal<IMinMaxPrice[]>([]);
  currentPriceTime = this.priceTimeData.mutate((data: IPriceTime[]) => {
    setInterval(() => {
      data.push({
        id: this.generateRandomString(),
        price: this.getRandomInt(),
        createdAt: new Date(),
      })
    }, 500)
  });

  constructor() { 
    // allows you to monitor price changes
    // effect(() => {
    //   setInterval(() => {
    //     console.log('price change', this.priceTimeData());
    //   }, 500)
    // });
  }

  public getMaxMinPrice(interval: number): void {
    const startDate = this.getStartCountingTime(interval);
    const endDate = this.getEndCountingTime();
    this.priceTimeData().filter((item: IPriceTime) => {
      if (new Date(item.createdAt) >= startDate && new Date(item.createdAt) <= endDate) {
        this.minMaxPrice.set(this.calculatePrices());
      }
    });
  }

  /**
   * get start time
   * @param {number} interval current interval
   * @returns {Date}
   */
  private getStartCountingTime(interval: number): Date {
    const startTime = new Date();
    startTime.setMinutes(this.getEndCountingTime().getMinutes() - interval);
    return startTime;
  }

  /**
   * get end time
   * @returns {Date}
   */
  private getEndCountingTime(): Date | any {
    return this.priceTimeData().reduce((a: IPriceTime, b: IPriceTime | any) => {
      return new Date(a.createdAt) > new Date(b.time) ? a.createdAt : b.createdAt;
    });
  }

  /**
   * get random number to create new price
   * @returns {number}
   */
  private getRandomInt(): number {
    return Math.floor(Math.random() * (999 - 100) + 100)
  }

  /**
   * get random string to create unique id
   * @returns {number}
   */
  private generateRandomString(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  /**
   * calculate max and min price
   * @returns {IMinMaxPrice[]}
   */
  private calculatePrices(): IMinMaxPrice[] {
    const maxAndMinPrice: IMinMaxPrice[] = [];
    const rangeList: number[] = [];
    this.priceTimeData().forEach((item) => {
      rangeList.push(item.price)
      const minValue = Math.min(...rangeList);
      const maxValue = Math.max(...rangeList);
      if (!maxAndMinPrice.length || maxAndMinPrice.length) {
        maxAndMinPrice.splice(0, maxAndMinPrice.length);
        maxAndMinPrice.push({
          min: minValue,
          max: maxValue,
        });
      }
    })
    return maxAndMinPrice;
  }
}
