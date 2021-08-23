import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  names: [] = [];
  ages: [] = [];
  combined: any[] = [];
  listOfKeys: any[] = [];
  showTable: boolean = false;
  faSortDown = faSortDown;
  faSortUp = faSortUp;
  activeColumn: any = null
  isAscending: boolean = false;
  error: string = ""

  constructor(
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private helpersService: HelpersService,
  ) {}

  keepOriginalOrder = (a: any, b: any) => a.key;

  combineArr(): void {
    this.combined = this.helpersService.combineArr(this.names, this.ages)
    this.findMaxKeys();
  }

  findMaxKeys(): void {
    this.listOfKeys = this.helpersService.findMaxKeys(this.combined);
    this.addNullValues();
  }

  addNullValues(): void {
    this.combined = this.helpersService.addNullValues(this.combined,  this.listOfKeys)
    this.spinner.hide();
    this.sortArr()
    this.showTable = true;
  }


  sortArr(col: any = this.listOfKeys[0]): void {
    if (col !== this.activeColumn) {
      this.activeColumn = col;
      this.isAscending = false
    } else {
      this.isAscending = !this.isAscending
    }
    this.combined = this.helpersService.sortArr(this.combined, col, this.isAscending)
  }

  ngOnInit(): void {
    this.spinner.show();
    this.dataService.getRecords('names').subscribe((results: any) => {
      this.names = results;
      this.error = "";
      this.combineArr();
    }, (error: any) => (this.error = <any>error));
    this.dataService.getRecords('ages').subscribe((results: any) => {
      this.ages = results;
      this.error = "";
      this.combineArr();
    }, (error: any) => (this.error = <any>error));
  }
}
