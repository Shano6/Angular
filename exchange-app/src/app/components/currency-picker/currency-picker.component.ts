import { Component, Input, OnInit } from '@angular/core';
import { Currencies } from 'src/app/interfaces/Index';
import { CurrencyService } from 'src/app/services/currency.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-currency-picker',
  templateUrl: './currency-picker.component.html',
  styleUrls: ['./currency-picker.component.scss'],
})
export class CurrencyPickerComponent implements OnInit {
  @Input() currencyList!: Currencies;

  constructor(private state: StateService) {}

  ngOnInit(): void {
    const currencyKeys = Object.keys(this.currencyList);
    this.state.setCurrencyState(currencyKeys[0], currencyKeys[1]);
  }

  swapCurrency() {
    this.state.swapCurrency();
  }
}
