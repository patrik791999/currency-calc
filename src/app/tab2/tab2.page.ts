import { Component } from '@angular/core';
import {Storage} from '@capacitor/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  coursesTable = new Map();

  constructor() {
    this.getFromStorage();
  }

  async getFromStorage() {

   const {value} = await Storage.get({
      key: 'currency',
    });
   const test = JSON.parse(value);
    console.log(test);
  }
}
