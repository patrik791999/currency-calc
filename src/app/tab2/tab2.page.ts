import { Component } from '@angular/core';
import {Storage} from '@capacitor/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  coursesTable = {};
  keys = [];

  constructor() {
    this.getFromStorage();
  }

  async getFromStorage() {
   const {value} = await Storage.get({
      key: 'currency',
    });
   this.coursesTable = JSON.parse(value);
    console.log(this.coursesTable);
    // eslint-disable-next-line guard-for-in
    for (const key in this.coursesTable) {
        this.keys.push(key);

    }
  }
}
