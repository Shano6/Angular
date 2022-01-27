import { Component, Input, OnInit } from '@angular/core';
import currencies from 'src/app/interfaces/currencies';
import { CurrencyService } from 'src/app/services/currency.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-currency-picker',
  templateUrl: './currency-picker.component.html',
  styleUrls: ['./currency-picker.component.scss']
})
export class CurrencyPickerComponent implements OnInit {
  @Input() currencyList!: currencies

  constructor(private state: StateService, private currencyservice: CurrencyService) { }

  ngOnInit(): void {
    const currencyKeys = Object.keys(this.currencyList)
    console.log(currencyKeys)
    this.state.setCurrencyState(currencyKeys[0], currencyKeys[1])
  }

  swapCurrency(){
    this.state.swapCurrency()
  }

}
