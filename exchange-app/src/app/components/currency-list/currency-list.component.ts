import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { Currencies } from 'src/app/interfaces/Index';
import { CurrencyService } from 'src/app/services/currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent implements OnInit, OnDestroy {
  @Input() currencyList!: Currencies;
  @Input() isFrom!: boolean;

  from?: string;
  to?: string;
  oldvalue?: string;
  currencyStateSubscription!: Subscription;

  constructor(
    private state: StateService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.currencyStateSubscription = this.state.currencyState$.subscribe(
      (state) => {
        this.from = state.from;
        this.to = state.to;
        if (this.isFrom && this.from) {
          const newCurrencyRate = this.currencyService.getExchangeRate(
            this.from!
          );
          this.state.setExchangeRateSTate(newCurrencyRate);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.currencyStateSubscription.unsubscribe();
  }

  onFocus(event: Event) {
    this.oldvalue = (<HTMLTextAreaElement>event.target).value;
  }

  onChange(event: Event) {
    const newCurrency = (<HTMLTextAreaElement>event.target).value;
    const exchangeRate = this.currencyService.getExchangeRate(this.from!);
    if (this.isFrom) {
      this.state.setCurrencyState(newCurrency, this.to);
      this.state.setExchangeRateSTate(exchangeRate);
    } else {
      this.state.setCurrencyState(this.from, newCurrency);
    }
  }

  isSelected(currency: object): boolean {
    console.log(currency);

    return false;
  }
}
