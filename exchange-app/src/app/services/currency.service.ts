import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExchangeRates } from '../interfaces/Index';
import { DatePipe } from '@angular/common';
import { isOutDated } from '../helpers/isOutDated';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(
    private http: HttpClient,
    private datepipe: DatePipe,
    private isOutDated: isOutDated
  ) {}

  getCurrencies() {
    const localCurrencyData = localStorage.getItem('currencies');
    if (localCurrencyData) {
      return JSON.parse(localCurrencyData!);
    } else {
      this.http
        .get('https://openexchangerates.org/api/currencies.json')
        .subscribe((currencies) => {
          localStorage.setItem('currencies', JSON.stringify(currencies));
          location.reload();
          return currencies;
        });
    }
  }

  getExchangeRate(code: string) {
    const localExchangeRateData = localStorage.getItem('exchangerates');
    const getExchangeRateFromApi = () =>
      this.getExchangeRateFromApi(code, localExchangeRateData!);
    if (localExchangeRateData) {
      const data = JSON.parse(localExchangeRateData)[code];
      if (data) {
        if (!this.isOutDated._(data.date)) {
          return data.rate;
        }
        getExchangeRateFromApi();
      } else getExchangeRateFromApi();
    } else getExchangeRateFromApi();
  }

  private getExchangeRateFromApi(code: string, localExchangeRateData: string) {
    const url = `https://freecurrencyapi.net/api/v2/latest?apikey=fa887050-7ef3-11ec-a7cb-839b31e098ad&base_currency=${code}`;
    this.http.get<ExchangeRates>(url).subscribe({
      next: (next) => {
        localStorage.setItem(
          'exchangerates',
          JSON.stringify({
            ...JSON.parse(localExchangeRateData),
            [code]: {
              date: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
              rate: next.data,
            },
          })
        );
        this.getExchangeRate(code);
      },
      error: () => {
        window.location.reload();
        alert("Couldn't get currency data");
      },
    });
  }
}
