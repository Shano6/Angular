import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ConverterComponent } from './components/converter/converter.component';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';
import { CurrencyPickerComponent } from './components/currency-picker/currency-picker.component';
import { CurrencyService } from './services/currency.service';
import { DatePipe, KeyValuePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { isOutDated } from './helpers/isOutDated';

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    CurrencyListComponent,
    CurrencyPickerComponent,
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [CurrencyService, DatePipe, KeyValuePipe, isOutDated],
  bootstrap: [AppComponent],
})
export class AppModule {}
