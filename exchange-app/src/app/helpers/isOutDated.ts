import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class isOutDated {
  constructor(private datepipe: DatePipe) {}

  _(date: string) {
    const currDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    const parsedDate = Date.parse(currDate!);
    return Date.parse(date) < parsedDate;
  }
}
