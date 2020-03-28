import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], propertyName: number): any[] {

    console.log(value);
    console.log(propertyName);
    return value;
  }
  //   if (propertyName)
  //     return value.sort((a: any, b: any) => b[propertyName].localeCompare(a[propertyName]));
  //   else
  //     return value;
  // }
}
