import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeRate } from '../interfaces/Index';
import { CurrencyState, ValueState } from '../interfaces/State';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private currencyState = new BehaviorSubject<CurrencyState>({});
  private valueState = new BehaviorSubject<ValueState>({});
  private exchangeRateState = new BehaviorSubject<ExchangeRate>({});

  public currencyState$: Observable<CurrencyState> =
    this.currencyState.asObservable();
  public valueState$: Observable<ValueState> = this.valueState.asObservable();
  public exchangeRateState$: Observable<ExchangeRate> =
    this.exchangeRateState.asObservable();

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

  setValueState(fromValue: number, toValue: number): void {
    this.valueState.next({
      fromValue: fromValue,
      toValue: toValue,
    });
  }

  setExchangeRateSTate(exchangerate: ExchangeRate): void {
    this.exchangeRateState.next(exchangerate);
  }
}
