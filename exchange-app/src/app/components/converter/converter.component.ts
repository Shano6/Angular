import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Currencies, ExchangeRate } from 'src/app/interfaces';
import { CurrencyService } from 'src/app/services/currency.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit, OnDestroy {
  curDate: Date = new Date();
  currencyList?: Currencies;
  currency!: string;
  exchangerate!: ExchangeRate;
  valueFrom = new FormControl('');
  valueTo = new FormControl('');
  stateSubscription!: Subscription;
  exchangeRateSubscription!: Subscription;

  constructor(
    private currencyService: CurrencyService,
    private state: StateService
  ) {}

  ngOnInit(): void {
    this.currencyList = this.currencyService.getCurrencies();
    this.valueTo.disable();
    this.stateSubscription = this.state.currencyState$.subscribe(
      (state) => (this.currency = state.to!)
    );
    this.state.valueState$.subscribe((state) => {
      if (state.fromValue != this.valueFrom.value && this.valueFrom.value) {
        this.valueFrom.setValue(state.fromValue);
        this.valueTo.setValue(state.toValue);
      }
    });

    this.exchangeRateSubscription = this.state.exchangeRateState$.subscribe(
      (exchangeRate) => {
        this.exchangerate = exchangeRate;
      }
    );
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
    this.exchangeRateSubscription.unsubscribe();
  }

  onChange() {
    const calculatedCurrency =
      parseFloat(this.valueFrom.value) * this.exchangerate![this.currency];
    const calculatedCurrencyRounded =
      Math.round(calculatedCurrency * 100) / 100;
    this.valueTo.setValue(calculatedCurrencyRounded);
    this.state.setValueState(
      parseFloat(this.valueFrom.value),
      calculatedCurrencyRounded
    );
  }
}
