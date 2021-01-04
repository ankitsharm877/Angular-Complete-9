import { Component } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  count = 0;
  even = [];
  odd = [];

  arr1 = [{
    'name': 'ankit',
    'code': 1,
    'count': 1
  },
  {
    'name': 'sharma',
    'code': 2,
    'count': 1
  },
  ];
  arr2 = [{
    'name': 'sharma',
    'code': 2,
    'count': 1
  },
  {
    'name': 'bipul',
    'code': 3,
    'count': 1
  }];
  constructor() {
    let set = new Array();
    for(let i = 0; i < this.arr1.length; i++) {
      for(let j=0; j < this.arr2.length; j++) {
        if(this.arr2[j].code === this.arr1[i].code) {
          this.arr1[i].count++;
        } else {
          console.log(this.arr2[j].code);
          if(!this.arr1.some(res => res.code === this.arr2[i].code)) {
            set.push(this.arr2[j]);
          }
        }
      }
    }
    console.log(this.arr1);
    console.log(set);
  }

  addDiv(event) {
    console.log(event);
    this.count = event;
    if (this.count % 2 === 0) {
      this.even.push(this.count);
    } else {
      this.odd.push(this.count);
    }


  }
}
