import { Pipe, PipeTransform } from '@angular/core';

const MAX_CHARS = 282;

@Pipe({
  name: 'maxChar'
})
export class MaxCharPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    return value.length > MAX_CHARS
      ? `${value.slice(0, MAX_CHARS)}...`
      : value;
  }
}
