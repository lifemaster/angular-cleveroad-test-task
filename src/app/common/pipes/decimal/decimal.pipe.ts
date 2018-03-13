import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {

  transform(value: number, symbol: string = ',', digits: number = 2): string {
    return value.toFixed(digits).replace('.', symbol);
  }

}
