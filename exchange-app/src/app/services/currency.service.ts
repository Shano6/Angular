import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import exchangeRate from '../interfaces/exchangerates';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService { 
  constructor(private http: HttpClient, state: StateService) {}

  getCurrencies(){
    const localCurrencyData = localStorage.getItem('currencies')
    if(localCurrencyData){
      return JSON.parse(localCurrencyData!)
    }else{
      this.http.get('https://openexchangerates.org/api/currencies.json').subscribe(currencies=>{
        localStorage.setItem('currencies', JSON.stringify(currencies))
        location.reload() 
        return currencies
      })
    }
  }

  getExchangeRate(code: string){
    const localExchangeRateData = localStorage.getItem('exchangerates')
    if(localExchangeRateData){
      const data = JSON.parse(localExchangeRateData)[code]
      if(data){
        return data
      } else this.getExchangeRateFromApi(code, localExchangeRateData!) //??????
    } else this.getExchangeRateFromApi(code, localExchangeRateData!)
  }

  private getExchangeRateFromApi(code: string , localExchangeRateData:string){
    const url = `https://freecurrencyapi.net/api/v2/latest?apikey=fa887050-7ef3-11ec-a7cb-839b31e098ad&base_currency=${code}`
    this.http.get<exchangeRate>(url).subscribe({
      next: next=>{
          localStorage.setItem('exchangerates', JSON.stringify({...JSON.parse(localExchangeRateData), [code]: next.data}))
          this.getExchangeRate(code)
      },
      error: ()=> {
          window.location.reload();
          alert("Couldn't get currency data")
        }
      }
    )
  }
}

