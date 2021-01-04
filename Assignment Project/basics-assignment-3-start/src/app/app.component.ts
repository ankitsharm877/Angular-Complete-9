import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDisplay = true;
  log = [];
  count =0;
  onDisplayDeatils(){
    this.isDisplay = !this.isDisplay;
    this.count = this.count + 1;
    this.log.push(this.count);
  }
}
