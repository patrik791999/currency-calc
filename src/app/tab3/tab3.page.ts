import {Component, OnInit} from '@angular/core';
import {CurrencyService} from '../services/currency.service';
import {HistoricalData} from '../interfaces/historicalData';
import { DatePipe } from '@angular/common';
import {Storage} from '@capacitor/storage';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [DatePipe]
})
export class Tab3Page {
  historicalData: HistoricalData = {};
  coursesTableFromStorage = {};
  inputDate: string;
  keys = [];
  keysSelector = [];
  baseCurr: any = 'EUR';

  constructor(protected cuService: CurrencyService, private datePipe: DatePipe) {
    this.getFromStorage();
  }

  async getFromStorage() {
    const {value} = await Storage.get({
      key: 'currency',
    });
    this.coursesTableFromStorage = JSON.parse(value);
    console.log(this.coursesTableFromStorage);
    // eslint-disable-next-line guard-for-in
    for (const key in this.coursesTableFromStorage) {
      this.keysSelector.push(key);
    }
  }

  async submitSearch(){
    this.inputDate = this.datePipe.transform(this.inputDate, 'yyyy-MM-dd');
    console.log(this.inputDate);
    this.historicalData = await this.cuService.getHistoricalData(this.inputDate,this.baseCurr);
    console.log(this.historicalData);
    // eslint-disable-next-line guard-for-in
    for (const key in this.historicalData.rates) {
      this.keys.push(key);

    }
  }

}
