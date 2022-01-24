import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class CurrencyService {

  apiKey = 'cdadaeeddb8765a70d17fdbd3bf38ff1';

  constructor(public http: HttpClient) {}

  async getCountries() {
    return await this.http.get(`https://api.exchangeratesapi.io/v1/latest?access_key=${this.apiKey}`).toPromise();
  }

  async getExchangeRate(from: string, to: string, amount: number){
    // eslint-disable-next-line max-len
    return await this.http.get(`https://api.exchangeratesapi.io/v1/convert?access_key=${this.apiKey}&from=${from}&to=${to}&amount=${amount}`).toPromise();
  }

}
