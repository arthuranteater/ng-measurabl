import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';

import { TableComponent } from './table.component';
import { DataService } from 'src/app/services/data.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { NgxSpinnerService } from 'ngx-spinner';

class MockDataService {
  names: any[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Shaun' },
    { id: 3, name: 'Adam' },
  ];
  ages: any[] = [
    { id: 1, age: 25 },
    { id: 2, age: 55 },
  ];
  keys: any[] = ['firstName', 'lastName', 'id', 'age'];
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let service: HelpersService;
  let spinnerService: NgxSpinnerService;
  let mData: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [TableComponent],
      // providers: [{ provide: DataService, useClass: MockDataService}]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(HelpersService);
    spinnerService = TestBed.inject(NgxSpinnerService);
    // mDataService = TestBed.inject(DataService);
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#title').textContent).toContain(
      'Persons Table'
    );
  });

  //test onClick to make sure activeColumn and isAscending is updating

  it('sortArr should update activeColumn and isAscending', () => {
    let sortSpy = spyOn<any>(service, 'sortArr');
    component.sortArr('firstName');
    expect(component.activeColumn).toBe('firstName');
    expect(component.isAscending).toBe(false);
    component.sortArr('firstName');
    expect(component.isAscending).toBe(true);
    expect(sortSpy).toHaveBeenCalled();
  });

  it('should start spinner OnInit', () => {
    let spinnerSpy = spyOn<any>(spinnerService, 'show');
    component.ngOnInit();
    expect(spinnerSpy).toHaveBeenCalled();
  });
});
