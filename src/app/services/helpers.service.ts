import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  sortArr(arr: any[], col: any, asc: boolean): any[] {
    return [...arr].sort((row1, row2) => {
      let a = row1[col]
      let b = row2[col]
      if (!isNaN(a)) {
        return asc ? a - b : b - a;
      } else {
        if(a < b) return asc ? -1: 1
        if(a > b) return asc ? 1: -1
        return 0;
      }
    });
  }

  addNullValues(sorted: any[], keys: any[]): any[] {
    return sorted.map((person: any) => {
      const nObj: any = {};
      keys.forEach((key: any) => {
        nObj[key] = person[key] || null;
      });
      return nObj;
    });
  }

  findMaxKeys(arr: any[]): any[] {
    let maxKeysLength: number = 0;
    let listOfKeys: string[] = [];
    arr.forEach((person: any) => {
      const keys = Object.keys(person);
      const keysLength = keys.length;
      if (keysLength > maxKeysLength) {
        maxKeysLength = keysLength;
        listOfKeys = keys;
      }
    });
    return listOfKeys
  }

  combineArr(arr1: any[], arr2: any[]): any[] {
    const nArr: any[] = [];
    [...arr1, ...arr2].map((c: any) => {
      const index = nArr.findIndex((s) => s.id === c.id);
      if (index >= 0) {
        nArr[index] = { ...nArr[index], ...c };
      } else {
        nArr.push(c);
      }
    });
    return nArr
  }
}
