import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {CurrencyService} from '../services/currency.service';
import {HttpClient} from '@angular/common/http';
import {Rates} from '../interfaces/rates';
import {Convert} from '../interfaces/convert';
import {Storage} from '@capacitor/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  latest: Rates = {};
  exchangeRate: Convert = {};

  countryCodes = [];
  countryCurrency = {};
  resultRate: any;

  fromValue: any;

  fromCurr: any = 'EUR'; // default values
  toCurr: any = 'USD'; // default values



  constructor(public navCtrl: NavController, protected cuService: CurrencyService, public http: HttpClient) {
  }
  ngOnInit() {

    this.storageManagement();
  }
  //  An asynchronous function which retrieves
  // CountryCode List
  async fetchCountries() {
    try {
      this.latest = await this.cuService.getCountries();
      this.countryCurrency = this.latest.rates;
      // eslint-disable-next-line guard-for-in
      for (const x in this.latest.rates) {
        this.countryCodes.push(x);
      }

    } catch (err) {
      console.error(err);
    }
    console.log(this.countryCodes);
    console.log(this.countryCurrency);
  }

  async getCurrencyRate(from,to,amount) {

    try {
      this.exchangeRate  = await this.cuService.getExchangeRate(from, to, amount);
      console.log(this.exchangeRate);
      this.resultRate = this.exchangeRate.result;
    }
    catch (err) {
      console.error(err);
    }
  }

  calculateCurrency() {

    if (this.fromValue == null){this.resultRate = null;}
    this.getCurrencyRate(this.fromCurr, this.toCurr,this.fromValue);
  }

  switchCurrencies(){
    const tmpCurr = this.toCurr;
    this.toCurr = this.fromCurr;
    this.fromCurr = tmpCurr;
  }

  clear(){
    if (this.fromValue === null){
      this.resultRate = null;
    }
  }


  async storageManagement(){
    const today = new Date().getTime()/1000;
    const timestamp = new Date(this.latest.date).getTime()/1000;
      if (this.latest.rates === undefined || ((today - timestamp)/3600) > 24  ){
        await this.fetchCountries();
        await Storage.set({
          key: 'currency',
          value: JSON.stringify(this.countryCurrency) ,
        });
      }

  }
}
