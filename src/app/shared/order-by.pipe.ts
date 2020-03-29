import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], field: any, reverse : boolean): any[] {

    if (field) {
      //value.sort((a: any, b: any) => b[propertyName].localeCompare(a[propertyName]));
      if (reverse) {
        array = array.sort((a, b) => {
          if (a[field] > b[field]) return -1;
          else if (a[field] < b[field]) return 1;
          else return 0;
        });

        return array;
      }
      else {
        array = array.sort((a, b) => {
          if (a[field] < b[field]) return -1;
          else if (a[field] > b[field]) return 1;
          else return 0;
        });

      }

      return array;
    }
    else {
      return array;
    }

  }
}
