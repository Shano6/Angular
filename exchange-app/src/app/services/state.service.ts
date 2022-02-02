import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Exchangerate from '../interfaces/Exchangerate';
import { CurrencyState, ValueState } from '../interfaces/State';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private currencyState = new BehaviorSubject<CurrencyState>({});
  private valueState = new BehaviorSubject<ValueState>({});
  private exchangeRateState = new BehaviorSubject<Exchangerate>({});

  getCurrencyState(): Observable<CurrencyState> {
    return this.currencyState.asObservable();
  }

  setCurrencyState(from?: string, to?: string): void {
    if (from === to) {
      this.swapCurrency();
    } else {
      this.currencyState.next({
        from: from,
        to: to,
      });

      this.setValueState(NaN, NaN);
    }
  }

  swapCurrency(): void {
    this.currencyState.next({
      from: this.currencyState.value.to,
      to: this.currencyState.value.from,
    });

    this.valueState.next({
      fromValue: this.valueState.value.toValue,
      toValue: this.valueState.value.fromValue,
    });
  }

  getValueState(): Observable<ValueState> {
    return this.valueState.asObservable();
  }

  setValueState(fromValue: number, toValue: number): void {
    this.valueState.next({
      fromValue: fromValue,
      toValue: toValue,
    });
  }

  getExchangeRateState(): Observable<Exchangerate> {
    return this.exchangeRateState.asObservable();
  }

  setExchangeRateSTate(exchangerate: Exchangerate): void {
    this.exchangeRateState.next(exchangerate);
  }
}
