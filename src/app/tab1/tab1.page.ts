import {Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { CurrencyService } from '../services/currency.service';
import { HttpClient } from '@angular/common/http';
import {Rates} from '../interfaces/rates';
import {Convert} from '../interfaces/convert';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  latest: Rates = {};
  exchangeRate: Convert = {};

  countryCodes = [];
  resultRate: any;

  fromValue: any;
  toValue: any;

  fromCurr: any = 'USD'; // default values
  toCurr: any = 'EUR'; // default values

  constructor(public navCtrl: NavController, protected cuService: CurrencyService, public http: HttpClient) {
  }
  ngOnInit() {
    this.fetchCountries();
  }
  //  An asynchronous function which retrieves
  // CountryCode List
  async fetchCountries() {
    try {
      this.latest = await this.cuService.getCountries();
      // eslint-disable-next-line guard-for-in
      for (const x in this.latest.rates) {
        this.countryCodes.push(x);
      }
    } catch (err) {
      console.error(err);
    }
    console.log(this.countryCodes);
  }

  async getCurrencyRate(from,to,amount) {

    try {
      this.exchangeRate  = await this.cuService.getExchangeRate(from, to, amount);
      console.log(this.exchangeRate);
      const rate = this.exchangeRate.result;
      this.resultRate = rate;
    }
    catch (err) {
      console.error(err);
    }
  }

  calculateCurrencyOne() {

    if (this.fromValue == null){this.resultRate = null;}
    this.getCurrencyRate(this.fromCurr, this.toCurr,this.fromValue);
  }
}
