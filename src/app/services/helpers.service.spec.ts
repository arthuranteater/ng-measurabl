import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HelpersService } from './helpers.service';

describe('HelpersService', () => {
  let service: HelpersService;
  let arr1: any[] = []
  let arr2: any[] = []
  let sorted1: any[] = []
  let keys: any[] = []
  let null1: any[] = []
  let combined: any[] = []

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(HelpersService);
    arr1 = [{id: 1, name: "John"}, {id: 2, name: "Shaun"}, {id: 3, name: "Adam"}]
    arr2 = [{id: 1, age: 25}, {id: 2, age: 55}]
    sorted1 = [{id: 3, name: "Adam"}, {id: 1, name: "John"}, {id: 2, name: "Shaun"}]
    keys = ["id", "name", "age"]
    null1 = [{id: 1, name: "John", age: null}, {id: 2, name: "Shaun", age: null}, {id: 3, name: "Adam", age: null}]
    combined = [{id: 1, name: "John", age: 25}, {id: 2, name: "Shaun", age: 55}, {id: 3, name: "Adam"}]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //test helper functions one to many

  it('arr should be sorted alphabetically based on name', () => {
    expect(service.sortArr(arr1, "name", true)).toEqual(sorted1)
  });

  it('keys and null values should be added', () => {
    expect(service.addNullValues(arr1, keys)).toEqual(null1)
  });

  it('arrays should be combined', () => {
    expect(service.combineArr(arr1,arr2)).toEqual(combined)
  });

  it('max keys should be found', () => {
    expect(service.findMaxKeys(combined)).toEqual(keys)
  });


});
