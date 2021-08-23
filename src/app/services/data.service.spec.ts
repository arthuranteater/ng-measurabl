import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('DataService', () => {
  let service: DataService;
  let httpServiceSpy: {get: jasmine.Spy};

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [DataService]
    });
    httpServiceSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new DataService(httpServiceSpy as any);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should stub getRecords', () => {
    var makes: string[] = ['these', 'are', 'stubbed', 'results'];
    httpServiceSpy.get.and.returnValue(of(makes));
    expect(service.getRecords("some value")).toBeTruthy();
    service.getRecords("some value").subscribe(data => {
      expect(data).toEqual(makes);
    });
  });

  it('Error should be passed through', async () => {
    let nData: any
    let nError: any
    let errorSpy = spyOn<any>(service, "handleError")
   await httpServiceSpy.get.and.returnValue(throwError({status: 404}).subscribe(data => nData = data, err => nError = err))
   expect(nError).toEqual({status: 404})
   });


});
