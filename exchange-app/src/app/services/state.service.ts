import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import exchangerate from '../interfaces/exchangerate';
import {currencyState, valueState} from '../interfaces/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private currencyState = new BehaviorSubject<currencyState>({}) 
  private valueState = new BehaviorSubject<valueState>({})
  private exchangeRateState = new BehaviorSubject<exchangerate>({})
  
  getCurrencyState(): Observable<currencyState>{
    return this.currencyState.asObservable()
  }

  setCurrencyState(from?:string, to?:string): void{
    if(from===to){
      this.swapCurrency()
    } else{
      this.currencyState.next({
        from: from,
        to: to
      })

      this.setValueState(NaN,NaN)
    }
  }  

  swapCurrency(): void{
    this.currencyState.next({
      from: this.currencyState.value.to,
      to: this.currencyState.value.from
    })

    this.valueState.next({
      fromValue: this.valueState.value.toValue,
      toValue: this.valueState.value.fromValue
    })
  }

  getValueState(): Observable<valueState>{
    return this.valueState.asObservable()
  }

  setValueState(fromValue: number, toValue:number): void{
    this.valueState.next({
      fromValue: fromValue,
      toValue: toValue
    })
  }

  getExchangeRateState(): Observable<exchangerate>{
    return this.exchangeRateState.asObservable()
  }

  setExchangeRateSTate(exchangerate: exchangerate): void{
    this.exchangeRateState.next(
      exchangerate
    )
  }
}
